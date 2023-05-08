import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMessageDetails } from '../../helpers/getData'
import { formatDate } from '../../helpers/formatDate'
import { getDataByHeaderName } from '../../helpers/getSubject'
import { decodeHtmlString } from '../../helpers/decodeHtmlString'

import './Modal.sass'

interface Props {
  id: string | undefined
  onClick: () => void
}

export default function Modal({ id, onClick }: Props) {

  const [message, setMessage] = useState<any>([])
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

  return (
    <div className='overlay'>
      {message && (
        <div className='modal'>
          <button onClick={onClick}>Close</button>
          <p>Date: {formatDate(message.internalDate)}</p>
          <p>
            Theme: {getDataByHeaderName(message?.payload?.headers, 'Subject')}
          </p>
          <p>From: {getDataByHeaderName(message?.payload?.headers, 'From')}</p>
          <p>To: {getDataByHeaderName(message?.payload?.headers, 'To')}</p>
          <p>Text:</p>{' '}
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