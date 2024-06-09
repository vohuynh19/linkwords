import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { useGetUser, useSocket } from '@/core/hooks';
import { Screen } from '@/ui/components';
import { dictionaryService } from '@/core/di/dict';
import { useStore } from '@/core/stores';
import { RootScreenProps } from '@/app/navigators/types';

const styles = StyleSheet.create({
  findingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: { height: '100%', paddingHorizontal: 16 },
  flex1: { flex: 1 },
  btnStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  alignItems: { alignItems: 'center' },
  row: { flexDirection: 'row' },
});

function Game({ navigation }: RootScreenProps<'Game'>) {
  const { user } = useStore();
  const { socket, connected } = useSocket();

  const competitorIdRef = useRef<string>();

  const [text, setText] = useState('');
  const [room, setRoom] = useState<string | null>(null);
  const [compId, setCompId] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'default' | 'win' | 'lose'>(
    'default',
  );
  const [isStartUser, setIsStartUser] = useState(false);

  const { data: myUser, refetch } = useGetUser(user.id);
  const { data: compUser } = useGetUser(compId);

  useEffect(() => {
    if (connected) {
      socket.on('pointUpdate', async () => {
        await refetch();
      });

      if (room == null) {
        socket.emit('enqueue');

        socket.on(
          'matchRoom',
          ({
            roomId,
            competitorId,
          }: {
            roomId: string;
            competitorId: string;
          }) => {
            competitorIdRef.current = competitorId;
            socket.emit('joinRoom', { roomId });
          },
        );
        socket.on('joinRoomSuccess', (roomId: string) => {
          setRoom(roomId);
          setCompId(Number(competitorIdRef.current));
          socket.emit('ready', { roomId });
        });
      } else {
        socket.on('message', (message: string) => {
          setMessages((prev) => [...prev, message]);
        });

        socket.on('startGame', ({ startUserId }: { startUserId: string }) => {
          if (!(startUserId === competitorIdRef.current)) {
            setIsStartUser(true);
            socket.emit('message', {
              roomId: room,
              message: dictionaryService.getRandomWord(),
            });
          }
        });

        socket.on('endgame', ({ loserId }: { loserId: string }) => {
          if (loserId === competitorIdRef.current) {
            // Win
            setGameState('win');
            socket.emit('pointIncrease');
            setTimeout(() => {
              navigation.replace('Game');
            }, 5000);
          } else {
            // Lose
            socket.emit('pointDecrease');
            setGameState('lose');
            setTimeout(() => {
              navigation.replace('Game');
            }, 5000);
          }
        });
      }
    }

    return () => {
      if (connected) {
        if (room == null) {
          socket.removeListener('matchRoom');
          socket.removeListener('joinRoomSuccess');
        } else {
          socket.removeListener('message');
          socket.removeListener('leaveRoomSuccess');
        }
      }
    };
  }, [socket, connected, room, refetch, navigation]);

  const handleVerifyMessage = () => {
    const isValid = dictionaryService.isLinkingWordPair(
      messages[messages.length - 1],
      `${messages[messages.length - 1].split(' ')[1]} ${text}`,
    );

    if (!isValid) {
      socket.emit('endgame', room);
    }
  };

  const onSendMessage = () => {
    setTimeout(() => {
      handleVerifyMessage();
    }, 500);

    socket.emit('message', {
      roomId: room,
      message: `${messages[messages.length - 1].split(' ')[1]} ${text}`,
    });

    setText('');
  };

  const isMyTurn = isStartUser
    ? messages.length % 2 === 0
    : messages.length % 2 === 1;

  if (!room || !compUser) {
    return (
      <Screen>
        <View style={styles.findingContainer}>
          <Text>Đang tìm kiếm đối thủ...</Text>
        </View>
      </Screen>
    );
  }

  if (gameState === 'win') {
    return (
      <View
        style={[
          {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text>You win</Text>
        <Text>Your score: {user?.point}</Text>

        <View style={{ height: 40 }} />
        <Text>Next match is comming...</Text>
      </View>
    );
  }

  if (gameState === 'lose') {
    return (
      <View
        style={[
          {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text>You lose</Text>
        <Text>Your score: {user?.point}</Text>

        <View style={{ height: 40 }} />
        <Text>Next match is comming...</Text>
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text>Competitor: {myUser?.username}</Text>

        <View style={styles.flex1} />

        <View style={[styles.alignItems, { marginBottom: 16 }]}>
          <Text variant="displaySmall">
            {isMyTurn ? 'Lượt của bạn' : 'Đợi đối thủ'}
          </Text>
        </View>

        <View style={styles.alignItems}>
          {messages.length > 0 && (
            <Text variant="displayLarge">{messages[messages.length - 1]}</Text>
          )}
        </View>

        <View style={styles.flex1} />

        <View
          style={[
            styles.row,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
            {
              opacity: isMyTurn ? 1 : 0,
            },
          ]}
        >
          {messages.length > 0 && (
            <Text
              style={{
                width: 40,
                marginRight: 8,
              }}
            >
              {messages[messages.length - 1].split(' ')[1]}
            </Text>
          )}

          <TextInput
            disabled={!isMyTurn}
            style={styles.flex1}
            value={text}
            onChangeText={(value) => setText(value.trim())}
            autoCapitalize="none"
          />
          <Button onPress={onSendMessage} style={styles.btnStyle}>
            <View>
              <Text>Send</Text>
            </View>
          </Button>
        </View>

        <View
          style={{
            height: Platform.select({
              android: 24,
              ios: 40,
            }),
          }}
        />
      </View>
    </Screen>
  );
}

export default Game;
