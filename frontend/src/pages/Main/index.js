import React from 'react';

import {
  Text, View, StyleSheet, Dimensions, ImageBackground, StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  welcome: {
    color: '#272727',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Main = () => (
  <View>
    <StatusBar barStyle="light-content" backgroundColor="#FF0164" />
    <Text style={styles.welcome}>Rotaract</Text>
  </View>
);

export default Main;
