import io from 'socket.io-client';
import store, {RootState} from '../redux/store/Store';
import {addMessage} from '../redux/slices/ChatSlice';
import {useSelector} from 'react-redux';

const SOCKET_URL = 'https://fillin.mobilesapplication.com:6001';

let socket: any = null;

export const initializeSocket = (userId: string) => {
  const token = useSelector((state: RootState) => state.commonSlice.auth_token);
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: {
      token: token, // Get from your auth system
    },
  });

  const channel = `private-chat.user.${1}`;

  socket.on('connect', () => {
    console.log('Socket connected');
    socket?.emit('subscribe', {channel});
  });

  socket.on('message.sent', (data: any) => {
    store.dispatch(
      addMessage({
        id: data.id,
        content: data.content,
        isMe: false,
        timestamp: data.created_at,
      }),
    );
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
