import { Base64 } from 'js-base64'

export const decodeHtmlString  = (str: string) => {  
  let  string = Base64.decode(str)
  return string
}