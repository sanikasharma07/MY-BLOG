import {configureStore} from '@reduxjs/toolkit'
import authService from '../appwrite/auth';
import authReducer from './authSlice'


export const store=configureStore({
    reducer:{
      auth:authReducer
    }
});
export default store;