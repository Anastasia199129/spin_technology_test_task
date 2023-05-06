import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './views/HomaPage/HomePage'
import LoginPage from './views/LoginPage/LoginPage'
import Header from './components/Header/Header'

import './styles/global.sass'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
