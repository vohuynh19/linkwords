import {
  configLoggerType,
  consoleTransport,
  logger as rnLogger,
} from 'react-native-logs';

const config: configLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3, // errors are sent to crashlytics
  },
  severity: 'error',
  transport: consoleTransport,
  transportOptions: {
    // https://github.com/onubo/react-native-logs#available-colors
    colors: {
      debug: 'white',
      info: 'white',
      warn: 'yellowBright',
      error: 'redBright',
    },
    extensionColors: {
      app: 'grey',
      api: 'green',
      nav: 'blue',
    },
  },
  enabledExtensions: ['app', 'api', 'nav'],
  async: false,
  printDate: false,
  printLevel: false,
};

export const log = rnLogger.createLogger<'debug' | 'info' | 'warn' | 'error'>(
  config,
);

export const appLog = log.extend('app');
export const apiLog = log.extend('api');
export const navLog = log.extend('nav');
