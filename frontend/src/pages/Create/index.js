import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, TextInput, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveDataInStorage } from '../../storage.js';

function Create() {

  const [value, onChangeText] = React.useState('');
  const navigation = useNavigation();

  const createTask = async () => {

    if(value && value.length > 0){
      saveDataInStorage(value).then(value => {
        if(value)
          navigation.goBack();
      })
    }else{
      Alert.alert(
        "Erro X40423r",
        "Brincadeira, você só esqueceu de colocar o nome do desafio mesmo rs",
      )
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Qual vai ser o desafio de hoje?</Text>
      <Text style={styles.descriptionHelp}>Ex: Caminha no parque de manhã</Text>
      <TextInput 
        style={styles.textInput}
        onChangeText={text => onChangeText(text)}
        value={value}
        onFocus={()=>{onChangeText("")}}
        autoFocus
      />
      <TouchableOpacity
        style={styles.button}
        onPress={createTask}
      >
        <Text style={styles.titleButton}>Criar desafio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  description:{
    fontSize: 18,
    color: "#272727"
  },
  descriptionHelp:{
    fontSize: 14,
    color: "#272727"
  },
  textInput: {
    height: 40,
    width: '70%', 
    borderColor: '#B7B7B7', 
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 32
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF0164",
    padding: 16,
    borderRadius: 24
  },
  titleButton:{
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16
  }
});


export default Create