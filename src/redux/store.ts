import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userReducer'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'user',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
devTools: process.env.NODE_ENV === 'development',
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof userReducer>

export const persistor = persistStore(store)

export default store

// import rootReducer from './reducers';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export type RootState = ReturnType<typeof store.getState>;

// export default store;
