// import { Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useGetUser, useSocket } from '@/core/hooks';
// import { useEffect, useRef, useState } from 'react';

function Game() {
  // const { gutters, backgrounds, fonts } = useTheme();

  // const { socket, connected } = useSocket();

  // const competitorIdRef = useRef<string>();

  // const [room, setRoom] = useState<string | null>(null);
  // const [compId, setCompId] = useState<number>(0);
  // const [messages, setMessages] = useState<string[]>([]);

  // const textRef = useRef<TextInput & { value: string }>(null);

  // const { data } = useGetUser(compId);

  // useEffect(() => {
  //   if (connected) {
  //     if (room == null) {
  //       socket.emit('enqueue');

  //       socket.on(
  //         'matchRoom',
  //         ({
  //           roomId,
  //           competitorId,
  //         }: {
  //           roomId: string;
  //           competitorId: string;
  //         }) => {
  //           competitorIdRef.current = competitorId;
  //           socket.emit('joinRoom', { roomId });
  //         },
  //       );
  //       socket.on('joinRoomSuccess', (roomId: string) => {
  //         setRoom(roomId);
  //         setCompId(Number(competitorIdRef.current));
  //       });
  //     } else {
  //       socket.on('message', (message: string) => {
  //         setMessages((prev) => [...prev, message]);
  //       });

  //       // socket.on('leaveRoomSuccess', (roomId: string) => {});
  //     }
  //   }

  //   return () => {
  //     if (connected) {
  //       if (room == null) {
  //         socket.removeListener('matchRoom');
  //         socket.removeListener('joinRoomSuccess');
  //       } else {
  //         socket.removeListener('message');
  //         socket.removeListener('leaveRoomSuccess');
  //       }
  //     }
  //   };
  // }, [socket, connected, room]);

  // const onSendMessage = () => {
  //   socket.emit('message', {
  //     roomId: room,
  //     message: textRef.current?.value,
  //   });
  // };

  // if (!room || !data) {
  //   return (
  //     <SafeScreen>
  //       <View style={[gutters.paddingHorizontal_12]}>
  //         <Text>Finding Room...</Text>
  //       </View>
  //     </SafeScreen>
  //   );
  // }

  return null;
  // <SafeScreen>
  //   <View style={[gutters.paddingHorizontal_12, layout.flex_1]}>
  //     <Text style={[fonts.bold, fonts.alignCenter]}>
  //       Competitor: {data.username}
  //     </Text>

  //     <View style={[layout.flex_1]} />

  //     {messages.length > 0 && <Text>{messages[messages.length - 1]}</Text>}

  //     <View style={[layout.flex_1]} />

  //     <View style={[layout.row, gutters.marginBottom_40]}>
  //       <TextInput
  //         placeholder="Enter"
  //         style={[
  //           backgrounds.gray100,
  //           layout.flex_1,
  //           gutters.paddingVertical_16,
  //         ]}
  //         ref={textRef}
  //         onChangeText={(text) => {
  //           if (textRef.current) {
  //             textRef.current.value = text;
  //           }
  //         }}
  //       />
  //       <TouchableOpacity
  //         onPress={onSendMessage}
  //         style={[layout.itemsCenter, layout.justifyCenter]}
  //       >
  //         <Text>Send</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // </SafeScreen>
}

export default Game;
