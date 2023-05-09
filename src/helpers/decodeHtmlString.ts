import { Base64 } from 'js-base64'

export const decodeHtmlString = (str: string) => {
  if (str) {
    let string = Base64.decode(str)
    return string
  } else return '<p>No body!</p>'
}