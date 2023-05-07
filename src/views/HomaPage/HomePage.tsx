import { useEffect, useState } from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import { getLabels } from '../../helpers/getData'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import MessagesList from '../../components/MessagesList/MessagesList'

import './HomePage.sass'

export default function HomePage() {
  const [labels, setLabels] = useState(null)
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const getData = async () => {
      if (user?.token && user?.email) {
        try {
          const response = await getLabels({token: user?.token, email: user?.email, resource: 'labels'})
          if (response) {
            setLabels(response.labels)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    getData()
  }, [])

  useEffect(()=> {

  }, [])

  return (
    <div className='homePageWrapper'>
      <Sidebar labels={labels} />
      <MessagesList/>
    </div>
  )
}
