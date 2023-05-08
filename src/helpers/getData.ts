import axios from 'axios'

interface Params {
  token: string
  email: string
  resource?: string
  currentLabel?: string
  messageId?: string
  pageToken?: number
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
  pageToken = 0,
}: Params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/${resource}?q=in:${currentLabel}&pageToken=${pageToken}&maxResults=50`,
      // &fields=messages(id,payload(headers,date,subject))
      config
    )
    if (response?.data?.messages) {
      const arrayMessages = await Promise.all(
        response.data.messages.map(({ id }: any) => {
          return axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${id}?format=full`,
            config
          )
        })
      )
      return {
        arrayMessages: arrayMessages,
        nextPageToken: response.data.nextPageToken,
      }
    } else {
      return { arrayMessages: [] }
    }
  } catch (error) {
    console.error(error)
  }
}

export const getMessageDetails = async ({
  token,
  email,
  messageId,
}: Params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${messageId}?format=full`,
      config
    )
    if (response.data) {
      return response.data
    } else throw new Error('Something is wrong')
  } catch (error) {
    console.error(error)
  }
}
