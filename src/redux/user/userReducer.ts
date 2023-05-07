import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: { token: string; email: string; isLoggedIn: boolean, name: string}
  currentLabel: string 
}

const initialState: UserState = {
  user: { token: '', email: '', isLoggedIn: false, name: ''},
  currentLabel: 'INBOX'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {      
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
    changeLabel: (state, action) => {
      state.currentLabel = action.payload
    }
  },
})

export const { setUser, clearUser, changeLabel } = userSlice.actions

export default userSlice.reducer