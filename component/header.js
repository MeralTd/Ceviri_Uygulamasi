import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Gravatar} from 'react-native-gravatar';

class header extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{this.props.title}</Text>
        <View>
          <Gravatar
            options={{
              email: 'meraltasdemir77@gmail.com',
              parameters: {size: '150', d: 'mm'},
              secure: true,
            }}
            style={styles.roundedProfileImage}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    height: 60,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    margin: 15,
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3027',
    marginLeft: 80,
  },
  roundedProfileImage: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    marginLeft: 25,
  },
});

export default header;
