import { PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function Screen({ children }: PropsWithChildren) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={['right', 'left', 'top']}>
      <StatusBar backgroundColor={theme.colors.background} />
      {children}
    </SafeAreaView>
  );
}

export default Screen;
