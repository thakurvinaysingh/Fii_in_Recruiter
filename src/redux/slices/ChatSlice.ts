import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatMessage} from '../../types/DataTypes';

interface ChatState {
  messages: ChatMessage[]; // Changed from [] to ChatMessage[]
  isLoading: boolean;
  error: string | null;
  currentChatId: string | null;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  currentChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
    loadMessagesStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    loadMessagesSuccess: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
      state.isLoading = false;
    },
    loadMessagesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    clearChat: () => initialState,
  },
});

export const {
  setCurrentChat,
  loadMessagesStart,
  loadMessagesSuccess,
  loadMessagesFailure,
  addMessage,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
