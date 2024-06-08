// import { useEffect } from 'react';
// import { ActivityIndicator, Text, View } from 'react-native';
import type { RootScreenProps } from '@/types/navigation';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/core/stores';
import { useTheme } from '@/ui/theme';
import { SafeScreen } from '@/ui/components/template';

import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { useCreateUser, useGetUser, useUpdateUser } from '@/core/hooks';

function Home({ navigation }: RootScreenProps<'Home'>) {
  const { t } = useTranslation(['common', 'input']);
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const { user, setUser } = useStore();

  const { data } = useGetUser(user.id);
  const { mutateAsync: createAnonymousUser } = useCreateUser();
  const { mutate: updateAnonymousUser } = useUpdateUser();

  const usernameRef = useRef<TextInput & { value: string }>(null);

  const onEnterUsername = async () => {
    const username = usernameRef.current?.value;
    if (username) {
      const newUser = await createAnonymousUser({
        username,
        currentUserId: user.id,
      });
      setUser(newUser);
    }
  };

  const onEnterChangeUsername = () => {
    const username = usernameRef.current?.value;
    if (username) {
      updateAnonymousUser({
        id: user.id,
        username,
      });
    }
  };

  const onEnterGame = () => navigation.navigate('Game');

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (!user?.username) {
    return (
      <SafeScreen>
        <View
          style={[
            gutters.paddingHorizontal_12,
            layout.fullHeight,
            layout.justifyCenter,
          ]}
        >
          <TextInput
            ref={usernameRef}
            onChangeText={(e) => {
              if (usernameRef.current) {
                usernameRef.current.value = e;
              }
            }}
            placeholder={t('input:username.placeholder')}
            style={[backgrounds.gray100, gutters.marginBottom_16]}
          />
          <TouchableOpacity onPress={onEnterUsername}>
            <Text>{t('common:enter')}</Text>
          </TouchableOpacity>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View style={[gutters.paddingHorizontal_12]}>
        <Text>{user.username}</Text>

        <View style={[gutters.marginBottom_16]} />

        <View style={[layout.row]}>
          <TextInput
            ref={usernameRef}
            onChangeText={(e) => {
              if (usernameRef.current) {
                usernameRef.current.value = e;
              }
            }}
            placeholder={t('input:username.changeUsername')}
            style={[backgrounds.gray100, layout.flex_1]}
          />

          <TouchableOpacity
            style={[layout.justifyCenter, backgrounds.gray50]}
            onPress={onEnterChangeUsername}
          >
            <Text>{t('common:enter')}</Text>
          </TouchableOpacity>
        </View>

        <View style={[gutters.marginBottom_16]} />

        <TouchableOpacity
          style={[
            layout.fullWidth,
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.paddingVertical_12,
            backgrounds.purple500,
          ]}
          onPress={onEnterGame}
        >
          <Text style={[fonts.white]}>{t('common:1v1')}</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

export default Home;
