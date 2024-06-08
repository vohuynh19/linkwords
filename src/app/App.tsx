import 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/ui/theme';

import ApplicationNavigator from './navigators/Application';
import { queryClient } from '../core/di/query';
import '../translations';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ApplicationNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
