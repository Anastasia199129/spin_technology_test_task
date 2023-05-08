import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMessages } from '../../helpers/getData'
import { formatDate } from '../../helpers/formatDate'
import { getDataByHeaderName } from '../../helpers/getSubject'

import Modal from '../../components/Modal/Modal'

import './MessagesList.sass'

export default function MessagesList() {
  const [messages, setMessages] = useState<any[]>([])
  const [showodal, setShowodal] = useState(false)
  const [clickedMessageId, setClickedMessageId] = useState('')
  const [pageToken, setPageToken] = useState(0)
  const [nextPageToken, setNextPageToken] = useState(0)
  const currentLabel = useSelector((state: any) => state.currentLabel)
  const user = useSelector((state: any) => state.user)

  const [indexes, setIndexes] = useState([0])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMessages({
          token: user.token,
          email: user.email,
          resource: 'messages',
          currentLabel,
          pageToken: 0,
        })
        setIndexes([0])
        if (response?.arrayMessages.length) {
          setNextPageToken(response.nextPageToken)
          setMessages(response.arrayMessages)
        } else return setMessages([])
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [currentLabel])

  const onCloseModal = () => {
    setShowodal(false)
  }

  let disableButton = false

  const onNextPageClick = async () => {
    try {
      const response = await getMessages({
        token: user.token,
        email: user.email,
        resource: 'messages',
        currentLabel,
        pageToken: nextPageToken,
      })
      if (response?.arrayMessages.length) {
        setIndexes((prev) => [...prev, nextPageToken])
        setNextPageToken(response.nextPageToken)
        setMessages(response.arrayMessages)
      } else return setMessages([])
    } catch (error) {
      console.log(error)
    }
  }

  const onPrevPageClick = async () => {
    try {
      const response = await getMessages({
        token: user.token,
        email: user.email,
        resource: 'messages',
        currentLabel,
        pageToken: indexes[indexes.length - 1],
      })
      if (response?.arrayMessages.length) {
        setMessages(response.arrayMessages)
        setNextPageToken(response.nextPageToken)

        const newArray = indexes.splice(0, indexes.length - 1)

        if (newArray.length === 0) {
          setIndexes([0])
        } else setIndexes(newArray)
      } else return setMessages([])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='listMessagesWrapper'>
      <div className='buttonsWrapper'>
        <button onClick={onPrevPageClick}>Prev</button>
        <button onClick={onNextPageClick}>Next</button>
      </div>
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
              <p>
                Theme: {getDataByHeaderName(data.payload.headers, 'Subject')}
              </p>
            </li>
          ))
        ) : (
          <li>
            <p>There are no messages</p>
          </li>
        )}
      </ul>
      {showodal && <Modal onClick={onCloseModal} id={clickedMessageId} />}
    </div>
  )
}