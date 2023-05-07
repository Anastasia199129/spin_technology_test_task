import { useEffect } from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import { getData } from '../../helpers/getData'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


export default function HomePage() {
  const user = useSelector((state: RootState) => state.user);
  console.log({user});

  useEffect(() => {
    const getLabels = async () => {
      if (user?.token && user?.email) {
        const resp = await getData(
          user?.token,
          user?.email,
          'labels'
        )
        console.log({ resp })
      }
    }
    getLabels()
  }, [])

  return (
    <div>
      <Sidebar />
    </div>
  )
}
