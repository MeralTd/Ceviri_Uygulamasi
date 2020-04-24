import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
try {
  firebase.initializeApp({
    apiKey: 'AIzaSyBAmwnD20SaDiDTIM-Ha8-Qtd0xlZNz_Rs',
    authDomain: 'ceviriuygulamsi.firebaseapp.com',
    databaseURL: 'https://ceviriuygulamsi.firebaseio.com',
    projectId: 'ceviriuygulamsi',
    storageBucket: 'ceviriuygulamsi.appspot.com',
    messagingSenderId: '227093573398',
  });
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack);
  }
}
const firebaseApp = firebase;
export default class GirisYap extends Component {
  state = {
    mail: '',
    sifre: '',
    errorMessage: null,
  };

  Login = (email, password) => {
    try {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.email);
          this.props.navigation.navigate('Anasayfa');
          Alert.alert('Başarılı', 'Başılı bir şekilde giriş yaptınız.');
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.bgImage} source={require('../assets/a.jpg')} />
        <View>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('../assets/translation.png')}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior={'position'}>
          <TextInput
            style={styles.myInput}
            autoCapitalize="none"
            placeholder="E-Posta"
            onChangeText={mail => this.setState({mail})}
            value={this.state.mail}
          />
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            style={styles.myInput}
            value={this.state.sifre}
            placeholder="Sifre.."
            onChangeText={sifre => this.setState({sifre})}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => this.Login(this.state.mail, this.state.sifre)}>
          <View style={styles.butonContainer}>
            <Text style={styles.butonTitle}>GİRİŞ YAP</Text>
          </View>
        </TouchableOpacity>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 15,
            color: '#02736e',
            marginTop: 15,
          }}>
          Hesabınız yok mu?
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('KayitOl')}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 100,
              height: 70,
              color: '#FF3027',
              textAlign: 'center',
              padding: 5,
              fontSize: 20,
              elevation: 4,
              zIndex: 10,
            }}>
            Kayıt Ol
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20b2aa',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  image2: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  butonTitle: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
  },
  butonContainer: {
    backgroundColor: '#FF3027',
    borderRadius: 25,
    height: 40,
    width: 250,
    justifyContent: 'center',
    margin: 30,
    elevation: 3,
  },
  myInput: {
    flexDirection: 'column',
    width: 250,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#fff',
    marginVertical: 5,
    paddingLeft: 18,
    zIndex: 10,
    borderBottomColor: '#FF3027',
  },
  butonLogin: {
    backgroundColor: '#FF3027',
    borderRadius: 25,
    height: 40,
    width: 150,
    margin: -80,
    justifyContent: 'center',
    marginTop: 65,
    marginLeft: 35,
    elevation: 3,
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
