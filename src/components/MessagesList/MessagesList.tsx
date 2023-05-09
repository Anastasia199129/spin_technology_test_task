import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMessages } from '../../helpers/getData'
import { formatDate } from '../../helpers/formatDate'
import { getDataByHeaderName } from '../../helpers/getSubject'

import LoaderSpiner from '../../components/LoaderSpiner/LoaderSpiner'
import NextPrevButtons from '../../components/NextPrevButtons/NextPrevButtons'
import Modal from '../../components/Modal/Modal'

import './MessagesList.sass'

export default function MessagesList() {
  const [messages, setMessages] = useState<any[]>([])
  const [showodal, setShowodal] = useState(false)
  const [clickedMessageId, setClickedMessageId] = useState('')
  const [nextPageToken, setNextPageToken] = useState(0)
  const [lastIndex, setLastIndex] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)
  const [indexes, setIndexes] = useState([0])

  const currentLabel = useSelector((state: any) => state.currentLabel)
  const user = useSelector((state: any) => state.user)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
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
        } else {
          setMessages([])
          setLastIndex(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
        setIsLoaded(true)
      }
    }
    getData()
  }, [currentLabel])

  const onNextPageClick = async () => {
    setIsLoading(true)
    try {
      const response = await getMessages({
        token: user.token,
        email: user.email,
        resource: 'messages',
        currentLabel,
        pageToken: nextPageToken,
      })
      if (response?.arrayMessages.length) {
        if (response?.arrayMessages.length === 50) {
          setLastIndex(false)
        }
        if (response.nextPageToken !== undefined) {
          setNextPageToken(response.nextPageToken)
          setIndexes((prev) => [...prev, nextPageToken])
        }
        setMessages(response.arrayMessages)
      } else return setMessages([])
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  const onPrevPageClick = async () => {
    setIsLoading(true)
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
          setLastIndex(true)
        } else setIndexes(newArray)
      } else return setMessages([])
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
    setIsLoading(false)
  }

  const onModalCloseClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowodal(false)
  } 

  return (
    <>
      <div className='listMessagesWrapper'>

        <NextPrevButtons
          lastIndex={lastIndex}
          messages={messages}
          onPrevPageClick={onPrevPageClick}
          onNextPageClick={onNextPageClick}
        />

        <ul className='listMessages'>

          {messages.length > 0 &&
            !isLoading &&
            messages?.map(({ data }) => (

              <li
                key={data.id}
                onClick={(e) => {
                  if(e.target === e.currentTarget){
                    setShowodal(true)
                  }
                  setClickedMessageId(data.id)
                }}
              >

                {showodal && clickedMessageId === data.id && (
                  <Modal 
                    onClick={onModalCloseClick} 
                    id={clickedMessageId} 
                  />
                )}

                <p>Date: {formatDate(data.internalDate)}</p>
                <p>
                  Theme: {getDataByHeaderName(data.payload.headers, 'Subject')}
                </p>

              </li>

            ))}

        </ul>

        {!isLoading && messages.length <= 0 && isLoaded && (
          <p className='noMessages'>There are no messages</p>
        )}

      </div>

      {isLoading && <LoaderSpiner />}
    </>
  )
}