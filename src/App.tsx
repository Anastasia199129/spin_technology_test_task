import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

import LoaderSpiner from './components/LoaderSpiner/LoaderSpiner'
import HomePage from './views/HomaPage/HomePage'
import LoginPage from './views/LoginPage/LoginPage'
import Header from './components/Header/Header'

import './styles/global.sass'

function App() {

  return (
    <Provider store={store}>
    <PersistGate loading={<LoaderSpiner/>} persistor={persistor}>
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