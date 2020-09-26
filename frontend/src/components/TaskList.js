import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Alert
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import { updateValueInStorage, deleteValueInStorage } from '../storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

const handleCheckBox = (checked, index, section) => updateValueInStorage(checked, index, section)
const handleDeleteTask = (index, section, setDeleted) => {
  deleteValueInStorage(index, section)
  setDeleted(true);
}

const Item = ({ item, index, section}) => {

  const [checkbox, setCheckbox] = useState(item.checked);
  const [deleted, setDeleted] = useState(false);

  return(
    !deleted ? 
      <View style={styles.item}>
        <View style={styles.checkboxContainer} >
          <CheckBox
            value={checkbox}
            onValueChange={() => { 
              handleCheckBox(!checkbox, index, section ),
              setCheckbox(!checkbox)
            }}
            style={styles.checkbox}
            tintColors={{ true: '#FF0164' }}  // FEF101
          />
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.delete} onTouchStart={() => {
            Alert.alert(
              "Excluindo, mas antes..",
              "Você tem certeza né, não tem como voltar depois",
              [
                {
                  text: 'Deixa quieto',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
                { text: 'Pode excluir', onPress: () => handleDeleteTask(index, section, setDeleted) }
              ],
              { cancelable: false }
            )
          }}>
            <Icon name="delete" size={28} color="#AAA" />
          </View>
        </View>
      </View>
    : null
  );
}

const TaskList = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      await AsyncStorage.getItem('@storage_tasks', (error, result) => {
        console.log('result ', result);
        setData(JSON.parse(result));
        setLoading(!loading)
      });
    };
    fetchData();
  }, []);

  return(
    <SafeAreaView style={styles.container}>
      {
        data && data.length > 0 ?
          <SectionList
            sections={data} 
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index, section }) => <Item item={item} index={index} section={section}/>}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        :
          <View style={styles.noData}>
            {
              !loading ?
                <View style={styles.noData}>
                  <Text style={styles.textNoData}>
                    Você ainda não se desafiou... 
                  </Text> 
                  <Text style={styles.textNoDataHelp}>
                    Para começar é bem fácil, basta clicar no botão com o + 
                  </Text>
                </View> 
              :
                <Text style={styles.textNoData}>
                  Preparando sua lista... 
                </Text>
              }
          </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 8,
    borderRadius: 6
  },
  header: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: "#ddd",
    color: '#666666'
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
    color: '#272727',
    width: '70%'
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: "center",
    width: 28,
    height: 28,
  },
  noData:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  textNoData:{
    fontSize: 24
  },
  textNoDataHelp:{
    fontSize: 18,
    textAlign: 'center'
  },  
  delete:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});

export default TaskList;
