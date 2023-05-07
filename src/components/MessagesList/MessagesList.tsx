import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import './MessagesList.sass'
import { getMessages } from '../../helpers/getData'
import { formatDate } from '../../helpers/formatDate'
import { getDataByHeaderName } from '../../helpers/getSubject'
import { discovery_v1 } from 'googleapis'
import Modal from '../../components/Modal/Modal'

export default function MessagesList() {
  const [messages, setMessages] = useState<any[]>([])
  const [showodal, setShowodal] = useState(false)
  const [clickedMessageId, setClickedMessageId] = useState('')
  const currentLabel = useSelector((state: any) => state.currentLabel)
  const user = useSelector((state: any) => state.user)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMessages({
          token: user.token,
          email: user.email,
          resource: 'messages',
          currentLabel,
        })
        if (response) {
          setMessages(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [currentLabel])

  const onCloseModal = () => {
    setShowodal(false)
  }

  return (
    <>
      <ul className='listMessages'>
        {messages.length > 0 ? (
          messages?.map(({ data }) => (
            <li
              key={data.id}
              onClick={() => {
                setShowodal(true)
                setClickedMessageId(data.id)                
              }}
            >
              <p>Date: {formatDate(data.internalDate)}</p>
              <p>Theme: {getDataByHeaderName(data.payload.headers, 'Subject')}</p>
            </li>
          ))
        ) : (
          <li>
            <p>There are no messages</p>
          </li>
        )}
      </ul>
      {showodal && <Modal onClick={onCloseModal} id={clickedMessageId} />}
    </>
  )
}
