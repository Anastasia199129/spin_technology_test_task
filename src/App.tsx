import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Form from './components/Form/Form'
import HomePage from './views/HomaPage/HomePage'
import LoginPage from './views/LoginPage/LoginPage'
import './styles/global.sass'

import GoogleLogin, { GoogleLogout } from 'react-google-login'
// import { loadAuth2, gapi } from 'gapi-script'
import Header from './components/Header/Header'
// import gapi from 'gapi-client';

function App() {
  const [user, setUser] = useState({ imageUrl: '', name: '' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // const clientId =
  //   '470281871112-3ljhjvae2tsmc8tn59te1cb0bbdtfvgn.apps.googleusercontent.com'

  // useEffect(() => {
  //   gapi.load('auth2', function () {
  //     gapi.auth2.init({
  //       client_id: clientId,
  //       cookie_policy: 'single_host_origin',
  //       scope: 'email profile',
  //     })
  //   })
  // }, [])


 
  //On load, called to load the auth2 library and API client library.
  // gapi.load('client:auth2', initClient);
   
  // // Initialize the API client library
  // function initClient() {
  //   gapi.client.init({
  //     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  //     clientId: 'YOUR_CLIENT_ID',
  //     scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
  //   }).then(function () {
  //     // do stuff with loaded APIs
  //     console.log('it worked');
  //   });
  // }
   


  // const onSuccess = (response: any) => {
  //   console.log(response)
  //   setUser(response.profileObj)
  //   setIsLoggedIn(true)
  // }

  // const onFailure = (response: any) => {
  //   console.error(response)
  // }

  // const onLogoutSuccess = () => {
  //   console.log('Logged out successfully')
  //   setIsLoggedIn(false)
  //   gapi.auth2.getAuthInstance().signOut()
  //   gapi.auth2.getAuthInstance().disconnect()
  // }

  return <div>
    
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
    </Routes>
    {/* <Routes>
      <Route path={['/', '/home']} element={<Header/>}/>
    </Routes> */}
    </BrowserRouter>
        {/* {isLoggedIn ? (
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
        )} */}
      </div>
}

export default App
