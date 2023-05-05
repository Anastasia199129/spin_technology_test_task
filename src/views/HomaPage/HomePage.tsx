import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { GoogleLogout } from 'react-google-login'

export default function HomePage() {

  // function logout() {
  //   console.log('User has logged out');
  //   // Add any additional logout logic here
  // }

  return (
    <div>
      HomePage
      <Sidebar/>

      {/* <GoogleLogout
      clientId="470281871112-3ljhjvae2tsmc8tn59te1cb0bbdtfvgn.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout> */}
    </div>
  )
}
