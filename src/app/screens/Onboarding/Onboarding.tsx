import Swiper from 'react-native-swiper';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text, useTheme } from 'react-native-paper';
import { RootScreenProps } from '@/app/navigators/types';

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
    position: 'relative',
  },
  silde2Abs: {
    position: 'absolute',
    top: 16,
    left: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function Onboarding({ navigation }: RootScreenProps<'Onboarding'>) {
  const theme = useTheme();

  return (
    <Swiper style={styles.wrapper} loop={false}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Đầu Cơ</Text>
      </View>
      <View style={styles.slide2}>
        <Button
          style={styles.silde2Abs}
          rippleColor={theme.colors.backdrop}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon source="close" size={24} />
        </Button>
        <Text style={styles.text}>Cơ Đầu</Text>
      </View>
    </Swiper>
  );
}

export default Onboarding;
