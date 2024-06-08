import ky from 'ky';
import { useStore } from '../stores';

const prefixUrl = `${process.env.API_URL ? process.env.API_URL : ''}/`;

export const kyInstance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (options) => {
        const userId = useStore.getState().user.id;
        options.headers.append('user-id', userId.toString());
      },
    ],
  },
});
