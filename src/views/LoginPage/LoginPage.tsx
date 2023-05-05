// import React from 'react'
// import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
// import { useGoogleLogin } from 'react-google-login'

export default function LoginPage() {
  const navigate = useNavigate()

  // const { signIn, loaded } = useGoogleLogin({
  //   onSuccess,
  //   onAutoLoadFinished,
  //   clientId,
  //   cookiePolicy,
  //   loginHint,
  //   hostedDomain,
  //   autoLoad,
  //   isSignedIn,
  //   fetchBasicProfile,
  //   redirectUri,
  //   discoveryDocs,
  //   onFailure,
  //   uxMode,
  //   scope,
  //   accessType,
  //   responseType,
  //   jsSrc,
  //   onRequest,
  //   prompt
  // })

  // const responseGoogle = (response: any) => {
  //   console.log(response)
  //   if (response.error === 'popup_closed_by_user') {
  //     console.log('ok')
  //     navigate('/home')
  //   }
  // }



  return (
    <div>
      {/* LoginPage
      <GoogleLogin
        clientId='470281871112-3ljhjvae2tsmc8tn59te1cb0bbdtfvgn.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
      /> */}


    </div>
  )
}
