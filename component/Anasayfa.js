import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './header';
import EditText from './editText';

const key =
  'trnsl.1.1.20200418T155013Z.245649a4ef8a4ce7.6e4258f65bd1b0643782e5f14898eecf1daf12ad';

export default class Anasayfa extends Component {
  constructor() {
    super();
    this.state = {
      kelime: '',
      loading: false,
      cevirilenKelime: '',
      dil: 'tr',
      yazilanDil: 'tr',
    };
  }

  kelimeDegis = kelime => {
    this.setState({kelime});
  };

  cevir = () => {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      fetch(
        'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' +
          key +
          '&lang=' +
          this.state.dil +
          '&text=' +
          this.state.kelime,
      )
        .then(response => response.json())
        .then(responseJson => {
          var cevirilenKelime = responseJson.text;
          this.setState({cevirilenKelime, loading: false});
        })
        .catch(error => {
          this.setState({loading: false});
        });
    }, 300);
  };

  kontrolEdiliyor = () => {
    if (!this.state.loading) {
      return (
        <View style={styles.translateViewStyle}>
          <Text style={styles.translatedWord}>
            {this.state.cevirilenKelime}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.progressStyle}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 18,
              color: '#FF3027',
              fontWeight: '500',
            }}>
            Çeviri yapılıyor...
          </Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Hoşgeldiniz.." />
        <Picker
          style={styles.picker}
          selectedValue={this.state.yazilanDil}
          onValueChange={lang => this.setState({yazilanDil: lang})}>
          <Picker.Item label="Türkçe" value="tr" />
          <Picker.Item label="İngilizce" value="en" />
          <Picker.Item label="Almanca" value="de" />
          <Picker.Item label="Fransızca" value="fr" />
          <Picker.Item label="İspanyolca" value="es" />
          <Picker.Item label="Rusça" value="ru" />
          <Picker.Item label="Çince" value="zh" />
          <Picker.Item label="Yunanca" value="el" />
          <Picker.Item label="Japonca" value="ja" />
          <Picker.Item label="Korece" value="ko" />
          <Picker.Item label="Portekizce" value="pt" />
          <Picker.Item label="İsveççe" value="sv" />
          <Picker.Item label="Ukraynaca" value="uk" />
          <Picker.Item label="Arapça" value="ar" />
          <Picker.Item label="Azerice" value="az" />
          <Picker.Item label="Latince" value="la" />
        </Picker>
        <Picker
          style={styles.picker2}
          selectedValue={this.state.dil}
          onValueChange={lang => this.setState({dil: lang})}>
          <Picker.Item label="Türkçe" value="tr" />
          <Picker.Item label="İngilizce" value="en" />
          <Picker.Item label="Almanca" value="de" />
          <Picker.Item label="Fransızca" value="fr" />
          <Picker.Item label="İspanyolca" value="es" />
          <Picker.Item label="Rusça" value="ru" />
          <Picker.Item label="Çince" value="zh" />
          <Picker.Item label="Yunanca" value="el" />
          <Picker.Item label="Japonca" value="ja" />
          <Picker.Item label="Korece" value="ko" />
          <Picker.Item label="Portekizce" value="pt" />
          <Picker.Item label="İsveççe" value="sv" />
          <Picker.Item label="Ukraynaca" value="uk" />
          <Picker.Item label="Arapça" value="ar" />
          <Picker.Item label="Azerice" value="az" />
          <Picker.Item label="Latince" value="la" />
        </Picker>
        <Image
          style={styles.trButton}
          source={require('../assets/arrow.png')}
        />
        <View style={styles.content}>
          <EditText kelimeDegis={this.kelimeDegis} />
          <TouchableOpacity
            onPress={this.cevir}
            disabled={
              // eslint-disable-next-line eqeqeq
              this.state.kelime.toString().trim().length == 0 ? true : false
            }>
            <View style={styles.butonContainer}>
              <Text style={styles.butonTitle}>ÇEVİRİ YAP</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.translatedWordHint}>Çeviri:</Text>
        </View>
        {this.kontrolEdiliyor()}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('GirisYap')}
          style={styles.butonLogin}>
          <Text style={styles.butonTitle}>GİRİŞ YAP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('KayitOl')}
          style={styles.butonRegister}>
          <Text style={styles.butonTitle}>KAYIT OL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Ses')}
          style={styles.butonSes}>
          <Text style={styles.butonTitle}>SES</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c6e2ff',
    paddingTop: 10,
  },
  content: {
    margin: 12,
  },
  translateViewStyle: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  translatedWordHint: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 300,
  },
  translatedWord: {
    fontSize: 20,
    color: '#FF3027',
    textAlign: 'center',
    fontWeight: 'bold',
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
    marginTop: 10,
    marginLeft: 70,
    elevation: 3,
  },
  butonLogin: {
    backgroundColor: '#FF3027',
    borderRadius: 25,
    height: 40,
    width: 150,
    margin: -80,
    justifyContent: 'center',
    marginTop: 165,
    marginLeft: 35,
    elevation: 3,
  },
  butonRegister: {
    backgroundColor: '#FF3027',
    borderRadius: 25,
    height: 40,
    width: 150,
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: 225,
    elevation: 3,
  },
  butonSes: {
    backgroundColor: '#FF3027',
    borderRadius: 25,
    height: 40,
    width: 150,
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: 130,
    elevation: 3,
  },
  progressStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButton: {
    marginLeft: 300,
    width: 30,
    height: 30,
    margin: 9,
  },
  pictureButton: {
    marginLeft: 350,
    width: 30,
    height: 30,
    margin: -35,
    marginTop: -35,
  },
  trButton: {
    marginLeft: 190,
    width: 25,
    height: 25,
    marginTop: -40,
  },
  picker: {
    width: 150,
    marginLeft: 20,
    marginTop: 5,
  },
  picker2: {
    width: 150,
    marginLeft: 250,
    marginTop: -50,
  },
});
