import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

// eslint-disable-next-line no-undef
export default (editText = props => {
  return (
    <TextInput
      style={styles.wordTextInput}
      placeholder="Metin girin."
      onChangeText={props.kelimeDegis}
    />
  );
});

const styles = StyleSheet.create({
  wordTextInput: {
    padding: 10,
    fontSize: 18,
    height: 150,
    marginTop: 5,
    textAlign: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#fff',
  },
});
