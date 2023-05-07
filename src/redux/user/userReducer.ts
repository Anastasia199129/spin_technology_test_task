import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: { token: string; email: string; isLoggedIn: boolean } | null
}

const initialState: UserState = {
  user: { token: '', email: '', isLoggedIn: false },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

// export const selectToken = (state: RootState) => state.user.token;

// export const selectEmail = (state: RootState) => state.user.email;

export default userSlice.reducer
