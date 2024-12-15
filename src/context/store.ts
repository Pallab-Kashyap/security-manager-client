// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './features/userSlice';
import dataReducer  from './features/dataSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
