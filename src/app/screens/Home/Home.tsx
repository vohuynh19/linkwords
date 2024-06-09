import { Platform, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Appbar, Button, Card, Icon, TextInput } from 'react-native-paper';

import { useStore } from '@/core/stores';
import { useCreateUser, useGetUser } from '@/core/hooks';
import { RootScreenProps } from '@/app/navigators/types';
import { Screen } from '@/ui/components';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  homeContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    flex: 1,
  },
  inputTitle: {
    marginTop: 24,
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
  },
  header: {
    position: 'absolute',
    top: Platform.select({
      android: 4,
      ios: 40,
    }),
    left: 0,
    width: '100%',
  },
  fullHeight: { height: '100%' },
});

function Home({ navigation }: RootScreenProps<'Home'>) {
  const { user, setUser } = useStore();

  const { data } = useGetUser(user.id);
  const { mutateAsync: createAnonymousUser } = useCreateUser();

  const [username, setUsername] = useState('');

  const onEnterUsername = async () => {
    if (username) {
      const newUser = await createAnonymousUser({
        username,
        currentUserId: user.id,
      });
      setUser(newUser);
    }
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (!user?.username) {
    return (
      <Screen>
        <View style={styles.container}>
          <TextInput
            label="Username"
            placeholder="Enter the username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <Button
            mode="elevated"
            style={styles.button}
            onPress={onEnterUsername}
          >
            <Icon source="send" size={24} />
          </Button>
        </View>
      </Screen>
    );
  }

  return (
    <View style={styles.fullHeight}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={user.username} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.homeContainer}>
        <Card onPress={() => navigation.navigate('Game')}>
          <Card.Title
            title="Chế độ 1v1"
            subtitle="Hệ thống sẽ tự tìm đối thủ cho bạn."
          />
        </Card>
      </View>
    </View>
  );
}

export default Home;
