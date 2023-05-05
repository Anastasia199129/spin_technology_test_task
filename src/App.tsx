import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Form from './components/Form/Form'
import HomePage from './views/HomaPage/HomePage'
import LoginPage from './views/LoginPage/LoginPage'
import './styles/global.sass'

import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { loadAuth2, gapi } from 'gapi-script'

function App() {
  const [user, setUser] = useState({ imageUrl: '', name: '' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const clientId =
    '470281871112-3ljhjvae2tsmc8tn59te1cb0bbdtfvgn.apps.googleusercontent.com'

  useEffect(() => {
    gapi.load('auth2', function () {
      gapi.auth2.init({
        client_id: clientId,
        cookie_policy: 'single_host_origin',
        scope: 'email profile',
      })
    })
  }, [])

  const onSuccess = (response: any) => {
    console.log(response)
    setUser(response.profileObj)
    setIsLoggedIn(true)
  }

  const onFailure = (response: any) => {
    console.error(response)
  }

  const onLogoutSuccess = () => {
    console.log('Logged out successfully')
    setIsLoggedIn(false)
    gapi.auth2.getAuthInstance().signOut()
    gapi.auth2.getAuthInstance().disconnect()
  }

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <>
            <GoogleLogout
              clientId={clientId}
              buttonText='Logout'
              onLogoutSuccess={onLogoutSuccess}
            />
            {user.name && user.imageUrl && (
              <div>
                <img src={user.imageUrl} alt={user.name} />
                <h3>{user.name}</h3>
              </div>
            )}
          </>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText='Login with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        )}
      </div>
    </div>
  )
}

export default App
