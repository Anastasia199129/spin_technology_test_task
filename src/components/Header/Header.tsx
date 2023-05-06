import { useState } from 'react'

// import Form from './components/Form/Form'
// import HomePage from './views/HomaPage/HomePage'
// import LoginPage from './views/LoginPage/LoginPage'
// import './styles/global.sass'
// 521840941505-g9pl366skc763nkmh8mes9ghscbliurp.apps.googleusercontent.com
// import s from './Header.module.sass'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [user, setUser] = useState({
    imageUrl: '',
    name: '',
    email: '',
    tokenId: '',
  })
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false)

  const navigate = useNavigate()

  const CLIENT_ID =
    '470281871112-fn8l1fr00gpv5vaotk3sll3l4nguknl5.apps.googleusercontent.com'
  const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly'

  async function fetchRest(token: string, googleId: string) {
    const response = await fetch(
      // `https://gmail.googleapis.com/gmail/v1/users/${googleId}/profile`,
      `https://gmail.googleapis.com/gmail/v1/users/${googleId}/messages?q=SPAM`,

      {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }
    )
    return await response.json()
  }

  // `https://gmail.googleapis.com/gmail/v1/users/${googleId}/messages?q=in:SPAM`

  const onSuccess = (response: any) => {
    console.log({ response })
    if (response.accessToken) {
      console.log(
        'gggggggggg',
        fetchRest(response.accessToken, response.googleId)
      )
    }

    setIsLoggedIn(true)
    localStorage.setItem('token', JSON.stringify(response.accessToken))
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
    navigate('/home', { state: { someData: 'hello world' } })
  }

  const onFailure = (response: any) => {
    console.error(response)
  }

  const onLogoutSuccess = () => {
    console.log('Logged out successfully')
    setIsLoggedIn(false)
    localStorage.setItem('token', '')
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
    gapi.auth2.getAuthInstance().signOut()
    gapi.auth2.getAuthInstance().disconnect()

    navigate('/')
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
          // cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          scope={SCOPE}
        />
      )}
    </div>
  )
}

export default Header
// scope="https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.insert https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.metadata"
