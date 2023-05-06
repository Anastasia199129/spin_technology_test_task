import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Form from './components/Form/Form'
// import HomePage from './views/HomaPage/HomePage'
// import LoginPage from './views/LoginPage/LoginPage'
// import './styles/global.sass'
// 521840941505-g9pl366skc763nkmh8mes9ghscbliurp.apps.googleusercontent.com

import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { loadAuth2, gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [user, setUser] = useState({
    imageUrl: '',
    name: '',
    email: '',
    tokenId: '',
  })
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false)
  const [id, setId] = useState('')
  const [token, setToken] = useState('')
  // let  ACCESS_TOKEN = JSON.parse(localStorage.getItem('token'))

  const navigate = useNavigate()

  const CLIENT_ID ='372431297241-vpgudgem9jnkoibs47562f8sqd834eks.apps.googleusercontent.com'
  const API_KEY = 'AIzaSyB8yzwc129nicgWGIWYvbCDn3MHzUAiHzw'
  const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly'

  useEffect(() => {
    // function start(){
    //   gapi.client.init({
    //     clientId: CLIENT_ID,
    //     apiKey: API_KEY,
    //     scope: SCOPE
    //   })
    //   gapi.load('client:auth2', start)
    // }
    gapi.load('auth2', function () {
      gapi.auth2.getAuthInstance({
        apiKey: API_KEY,
        client_id: CLIENT_ID,
        // cookie_policy: 'single_host_origin',
        // discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        scope: SCOPE
        // scope: SCOPE,
      })
    })
  }, [])

  // let accessToken = gapi.auth.getToken().access_token


  async function fetchRest(token: string, googleId: string) {
    const response = await fetch(
      // `https://gmail.googleapis.com/gmail/v1/users/${googleId}/profile`,
      `https://gmail.googleapis.com/gmail/v1/users/${googleId}/labels`,
      {
        // mode: 'cors',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }
    )
    return await response.json()
  }

  // useEffect(() => {
  //   if (token) {
  //     console.log('gggggggggg',fetchRest(token));
  //   }
  // }, [token])

  const onSuccess = (response: any) => {
    // console.log({token: response.accessToken});
    // console.log({tokenId: response.tokenId});
    console.log({response})
    setId(response.googleId)
    setUser(response.profileObj)
    setToken(response.accessToken)
    if(response.accessToken ){
      console.log('gggggggggg',fetchRest(token, response.profileObj.email))
    }
   
    setIsLoggedIn(true)
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
    // navigate('/home')
  }

  const onFailure = (response: any) => {
    console.error(response)
  }

  const onLogoutSuccess = () => {
    console.log('Logged out successfully')
    setIsLoggedIn(false)
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
    gapi.auth2.getAuthInstance().signOut()
    gapi.auth2.getAuthInstance().disconnect()

    // navigate('/')
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={onLogoutSuccess}
          />
          {user.name && user.imageUrl && (
            <div>
              {/* ///////////////   <img src={user.imageUrl} alt={user.name} /> */}
              <h3>{user.name}</h3>
            </div>
          )}
        </>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login with Google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
    </div>
  )
}

export default Header
