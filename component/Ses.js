import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Picker,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Voice from 'react-native-voice';
const key =
  'trnsl.1.1.20200418T155013Z.245649a4ef8a4ce7.6e4258f65bd1b0643782e5f14898eecf1daf12ad';

class Ses extends Component {
  state = {
    kelime: [],
    loading: false,
    cevirilenKelime: '',
    dil: 'tr',
  };

  constructor(props) {
    super(props);
    //Setting callbacks for the process status
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
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

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      kelime: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      kelime: [],
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Sesi(İngilizce) Yazıya Dönüştürmek İçin Mikrofana Tıklayın
        </Text>
        <TouchableHighlight
          onPress={this._startRecognizing}
          style={{marginVertical: 20}}>
          <Image
            style={styles.button}
            source={require('../assets/microphone.png')}
          />
        </TouchableHighlight>
        <Text
          style={{
            textAlign: 'center',
            color: '#B0171F',
            marginBottom: 1,
            fontWeight: '700',
            fontSize: 18,
          }}>
          Söylediğiniz Kelime
        </Text>
        <ScrollView onChangeText={this.kelimeDegis}>
          {this.state.kelime.map((result, index) => {
            return (
              <Text
                key={`partial-result-${index}`}
                style={{
                  textAlign: 'center',
                  color: '#B0171F',
                  marginBottom: 1,
                  fontWeight: '700',
                  fontSize: 18,
                }}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <Picker
          style={styles.picker2}
          selectedValue={this.state.dil}
          onValueChange={lang => this.setState({dil: lang})}>
          <Picker.Item label="Türkçe" value="tr" />
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
        <Text style={styles.translatedWordHint}>Çevirisi :</Text>
        {this.kontrolEdiliyor()}
        <View style={styles.content}>
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#c6e2ff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker2: {
    width: 150,
    marginLeft: 50,
    marginBottom: 140,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  content: {
    margin: 12,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 30,
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
    marginLeft: 20,
    elevation: 3,
    marginTop: 80,
  },
  translatedWordHint: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 300,
  },
});
export default Ses;
