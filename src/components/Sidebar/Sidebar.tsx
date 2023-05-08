import { useDispatch, useSelector } from 'react-redux'
import { changeLabel, clearUser } from '../../redux/user/userReducer'

import './Sidebar.sass'

interface Props {
  labels:
    | {
        id: string
        name: string
        messageListVisibility: string
        labelListVisibility: string
        type: string
      }[]
    | null
}

export default function Sidebar({ labels }: Props) {
  const currentLabel = useSelector((state: any) => state.currentLabel)

  const dispatch = useDispatch()

  const onLabelClick = (e: any) => {
    dispatch(changeLabel(e.target.textContent))
  }

  return (
    <aside className='sidebar'>
      <ul>
        {labels &&
          labels.map(({ id, name }) => (
            <li
              className={`${currentLabel === name ? 'active' : ''}`}
              key={id}
              onClick={onLabelClick}
            >
              {name}
            </li>
          ))}
      </ul>
    </aside>
  )
}