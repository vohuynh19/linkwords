import ky from 'ky';

const prefixUrl = `${process.env.API_URL ? process.env.API_URL : ''}/`;

export const kyInstance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
});
