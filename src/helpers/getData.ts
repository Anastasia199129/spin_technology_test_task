import axios from 'axios'

interface Params {
  token: string
  email: string
  resource?: string
  currentLabel?: string
}

export const getLabels = async ({ token, email, resource }: Params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/${resource}`,
      config
    )
    if (response.data) {
      return response.data
    } else throw new Error('Something is wrong')
  } catch (error) {
    console.error(error)
  }
}

export const getMessages = async ({
  token,
  email,
  resource,
  currentLabel,
}: Params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/${resource}?q=in:${currentLabel}&maxResults=50`,
      // &fields=messages(id,payload(headers,date,subject))
      config
    )
    if (response?.data?.messages?.length) {
      const arrayMessages = await Promise.all(
        response.data.messages.map(({ id }: any) => {
          return axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${id}?format=full`,
            config
          )
        })
 
      )
      return arrayMessages
    } else return []
  } catch (error) {
    console.error(error)
  }
}
