import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './views/HomaPage/HomePage'
import LoginPage from './views/LoginPage/LoginPage'
import Header from './components/Header/Header'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';




import './styles/global.sass'
import Loader from './components/Loader/Loader'
// import s from './App.module.scss'

let loader = localStorage.getItem('isLoggedIn')

function App() {
  console.log({store: store.getState(), persistor});

  return (
    <Provider store={store}>
    <PersistGate loading={<Loader/>} persistor={persistor}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  )
}

export default App
