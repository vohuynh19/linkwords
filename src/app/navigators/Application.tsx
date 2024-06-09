import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  adaptNavigationTheme,
  PaperProvider,
  MD3LightTheme,
} from 'react-native-paper';

import { Home, Game, Onboarding } from '@/app/screens';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const theme = {
  ...MD3LightTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    myOwnColor: '#BADA55',
  },
};

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
});

function ApplicationNavigator() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={LightTheme}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Onboarding"
          >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default ApplicationNavigator;
