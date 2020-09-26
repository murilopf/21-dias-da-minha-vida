import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RoundedButton = () => {

  const navigation = useNavigation();

  return(
    <TouchableOpacity
      style={styles.button}
      onPress={()=> navigation.navigate('Create')}
    >
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#FF0164",
    marginBottom: 16,
    marginRight: 16,
    marginTop: 16
  },
  buttonText:{
    color: "#FFF",
    fontSize: 28
  }
});

export default RoundedButton;