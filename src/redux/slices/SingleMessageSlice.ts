import {createSlice} from '@reduxjs/toolkit';
import {ChatMessage} from '../../types/DataTypes';
const initialState = {
  messages: [] as ChatMessage[],
  newMessage: '',
  isConnected: false,
  socketStatus: 'disconnected' as 'connecting' | 'connected' | 'disconnected',
  echoInstance: null as any,
  messageReceived: 0,
};

const singleMessageSlice = createSlice({
  name: 'singleMessage',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setAddMessage: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.messages = [...state.messages, ...action.payload];
      } else {
        state.messages.push(action.payload);
      }
    },
    updateMessageStatus: (state, action) => {
      const {tempId, newId, status} = action.payload;
      const index = state.messages.findIndex(msg => msg.id === tempId);
      if (index !== -1) {
        state.messages[index] = {
          ...state.messages[index],
          id: newId || tempId,
          status: status,
        };
      }
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setSocketStatus: (state, action) => {
      state.socketStatus = action.payload;
    },
    setEchoInstance: (state, action) => {
      state.echoInstance = action.payload;
    },
    setMessageReceived: (state, action) => {
      state.messageReceived = action.payload;
    },
  },
});

export const {
  setMessages,
  setAddMessage,
  updateMessageStatus,
  setNewMessage,
  setIsConnected,
  setSocketStatus,
  setEchoInstance,
  setMessageReceived,
} = singleMessageSlice.actions;

export default singleMessageSlice.reducer;
