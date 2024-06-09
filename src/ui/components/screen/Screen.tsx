import { PropsWithChildren } from 'react';
import { StatusBar, View } from 'react-native';

function Screen({ children }: PropsWithChildren) {
  return (
    <View>
      <StatusBar />
      {children}
    </View>
  );
}

export default Screen;
