// import { useEffect } from 'react';
// import { ActivityIndicator, Text, View } from 'react-native';
// import { useQuery } from '@tanstack/react-query';
// import { useTranslation } from 'react-i18next';

// import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';

// import type { RootScreenProps } from '@/types/navigation';
import { View } from 'react-native';

function Home() {
  // { navigation }: RootScreenProps<'Home'>
  // const { layout, gutters, fonts } = useTheme();
  // const { t } = useTranslation(['common']);

  return (
    <SafeScreen>
      <View>{null}</View>
    </SafeScreen>
  );
}

export default Home;
