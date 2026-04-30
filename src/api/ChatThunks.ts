import {AppDispatch} from '../redux/store/Store';
// import {sendChatMessage, getChatHistory} from '../../services/apiService';
import {gettingChatHistory, sendingMessage} from './ApiServices';
import {
  addMessage,
  loadMessagesStart,
  loadMessagesSuccess,
  loadMessagesFailure,
} from '../redux/slices/ChatSlice';

export const fetchChatHistory =
  (chatId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loadMessagesStart());
      const messages = await gettingChatHistory(chatId);
      dispatch(loadMessagesSuccess(messages));
    } catch (error: any) {
      dispatch(loadMessagesFailure(error.message));
    }
  };

export const sendMessage =
  (recruiter_id: string, message: string) => async (dispatch: AppDispatch) => {
    try {
      // Optimistically add the message
      const tempMessage: any = {
        id: Date.now().toString(),
        message,
        isMe: true,
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(tempMessage));

      // Send to server
      await sendingMessage(recruiter_id, message);

      // The actual message with server ID will come via socket
    } catch (error: any) {
      // Handle error (maybe remove the optimistic message)
      dispatch(loadMessagesFailure(error.message));
    }
  };
