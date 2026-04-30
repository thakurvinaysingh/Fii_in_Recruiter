import {configureStore} from '@reduxjs/toolkit';
import commonSlice from '../slices/CommonSlice';
import ProfileSlice from '../slices/ProfileSlice';
import chatSlice from '../slices/ChatSlice';
import singleMessageSlice from '../slices/SingleMessageSlice';

const store = configureStore({
  reducer: {
    commonSlice: commonSlice,
    profileSlice: ProfileSlice,
    chat: chatSlice,
    singleMessageSlice: singleMessageSlice,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
