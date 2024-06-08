import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Home, InitializeApp } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <InitializeApp>
          <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </InitializeApp>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
