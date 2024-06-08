import Reactotron, { ReactotronReactNative } from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query';

import config from '../app.json';
import { mvkvInstance } from './core/libs/mvkv/instance';
import { queryClient } from './core/di';

const queryClientManager = new QueryClientManager({
  queryClient,
});

Reactotron.configure({
  name: config.name,
  onDisconnect: () => {
    queryClientManager.unsubscribe();
  },
})
  .useReactNative()
  .use(mmkvPlugin<ReactotronReactNative>({ storage: mvkvInstance }))
  .use(reactotronReactQuery(queryClientManager))
  .connect();
