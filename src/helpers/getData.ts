// interface Params {
//   url: string
//   id?: string
// }
import axios from 'axios'
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';




export const getData = async (
  token: string,
  email: string,
  // url: string,
  resource: string,
  query?: string,
  id?: string
) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${email}/${resource}`, config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// const token = 'your_token_here'

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// }

// axios
//   .get('http://example.com/api/data', config)
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// async function fetchRest(token: string, googleId: string) {
//   const response = await fetch(
//     // `https://gmail.googleapis.com/gmail/v1/users/${googleId}/profile`,
//     `https://gmail.googleapis.com/gmail/v1/users/${googleId}/messages?q=SPAM`,

//     {
//       headers: new Headers({
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }),
//     }
//   )
//   return await response.json()
// }
