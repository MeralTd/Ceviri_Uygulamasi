import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Anasayfa from './component/Anasayfa';
import GirisYap from './component/GirisYap';
import KayitOl from './component/KayitOl';
import Ses from './component/Ses';

const AppNavigator = createStackNavigator(
  {
    Anasayfa: {
      screen: Anasayfa,
      navigationOptions: {
        header: null,
      },
    },
    GirisYap: {
      screen: GirisYap,
      navigationOptions: {
        header: null,
      },
    },
    KayitOl: {
      screen: KayitOl,
      navigationOptions: {
        header: null,
      },
    },
    Ses: {
      screen: Ses,
      navigationOptions: {
        title: 'Ses Dönüştürme',
        headerStyle: {
          backgroundColor: '#FF3027',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    initialRouteName: 'Anasayfa',
  },
);
export default createAppContainer(AppNavigator);
