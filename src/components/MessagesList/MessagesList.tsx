import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import './MessagesList.sass'
import { getMessages } from '../../helpers/getData'
import { formatDate } from '../../helpers/formatDate'
import { getSubject } from '../../helpers/getSubject'
import { discovery_v1 } from 'googleapis'

export default function MessagesList() {
  const [messages, setMessages] = useState<any[]>([])
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
          console.log('!!!!!!!!!!!!!!!!!!!!!!!!', response)
          setMessages(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [currentLabel])

  return (
    <ul className='listMessages'>
      {messages.length > 0 ? (
        messages?.map(({ data }) => (
          <li key={data.id}>
            <p>Date: {formatDate(data.internalDate)}</p>
            <p>Theme: {getSubject(data.payload.headers)}</p>
          </li>
        ))
      ) : (
        <li>
          <p>There are no messages</p>
        </li>
      )}
    </ul>
  )
}
