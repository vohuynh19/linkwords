import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

import { getSocketUrl } from '../utils';
import { useStore } from '../stores';
import { appLog } from '../libs';

export const useSocket = () => {
  const { user } = useStore();
  const [connected, setConnected] = useState(false);

  const socket = useMemo(() => {
    return io(getSocketUrl(), {
      extraHeaders: {
        'user-id': user.id.toString(),
      },
    });
  }, [user.id]);

  useEffect(() => {
    socket.on('connect', () => {
      appLog.debug('Socket connected');
      setConnected(true);
      // socket?.on('message', (data) => console.log('on message', data));
      // setTimeout(() => {
      //   socket?.emit('message', {
      //     userId: 'asdf',
      //   });
      // }, 4000);
    });

    socket.on('disconnect', () => {
      appLog.debug('Socket disconnected');
      setConnected(false);
    });

    return () => {
      socket.close();
      setConnected(false);
    };
  }, [socket]);

  return { socket, connected };
};
