import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '../../redux/user/userReducer'
import { RootState } from '../../redux/store'

import './Header.sass'

function Header() {
  const userSlice = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const CLIENT_ID =
    '470281871112-fn8l1fr00gpv5vaotk3sll3l4nguknl5.apps.googleusercontent.com'
  const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly'

  const onSuccess = (response: any) => {
    if (response.accessToken) {
      dispatch(
        setUser({
          token: response.accessToken,
          email: response.profileObj.email,
          isLoggedIn: true,
          name: response.profileObj.name,
        })
      )
      navigate('/home')
    }
  }

  const onFailure = (response: any) => {
    console.error(response)
  }

  const onLogoutSuccess = () => {
    console.log('Logged out successfully')
    dispatch(clearUser())
    gapi.auth2.getAuthInstance().signOut()
    gapi.auth2.getAuthInstance().disconnect()
    navigate('/')
  }

  return (
    <div className='header'>
      <h1>Welcome</h1>
      {userSlice?.isLoggedIn ? (
        <>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={onLogoutSuccess}
          />
          {userSlice.name && (
            <div className='wrapperUser'>
              <span>{userSlice.name.slice(0, 2)}</span>
              {/* <img src={user.imageUrl} alt={user.name} />  */}
              <h3>{userSlice.name}</h3>
            </div>
          )}
        </>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login with Google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          isSignedIn={true}
          scope={SCOPE}
        />
      )}
    </div>
  )
}

export default Header