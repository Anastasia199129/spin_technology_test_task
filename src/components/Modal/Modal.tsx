import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getMessageDetails } from '../../helpers/getData'
import { formatDate } from '../../helpers/formatDate'
import { getDataByHeaderName } from '../../helpers/getSubject'
import { decodeHtmlString } from '../../helpers/decodeHtmlString'

import './Modal.sass'

interface Props {
  id: string | undefined
  onClick?: (e: any) => void
}

export default function Modal({ onClick, id }: Props) {

  const [message, setMessage] = useState<any>([])
  const modalRef = useRef<HTMLDivElement | null>(null)
  const user = useSelector((state: any) => state.user)

  useEffect(() => {
    const getData = async () => {
      try {
        const responce = await getMessageDetails({
          token: user.token,
          email: user.email,
          messageId: id,
        })
        if (responce) setMessage(responce)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (modalRef.current && onClick) {
      modalRef.current.addEventListener('click', onClick)
    }
    return () => {
      if (modalRef.current && onClick) {
        modalRef.current.removeEventListener('click', onClick)
      }
    }
  }, [])

  return (
    <div 
      className='overlay' 
      ref={modalRef}
    >
      {message && (
        <div className='modal'>

          <button 
            onClick={onClick} 
            className='closeBtn'
          >
            Close
          </button>

          <p>Date: {formatDate(message.internalDate)}</p>
          <p>
            Theme: {getDataByHeaderName(message?.payload?.headers, 'Subject')}
          </p>
          <p>From: {getDataByHeaderName(message?.payload?.headers, 'From')}</p>
          <p>To: {getDataByHeaderName(message?.payload?.headers, 'To')}</p>
          <p>Text:</p>

          {message?.payload?.parts ? (
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtmlString(
                  message?.payload?.parts[1]?.body?.data
                ),
              }}
            />
          ) : (
            <p>{message?.snippet}</p>
          )}

        </div>
      )}
    </div>
  )
}