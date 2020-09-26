import React from 'react';
import {
  View, StyleSheet
} from 'react-native';
import 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import TaskList from '../../components/TaskList';
import RoundedButton from '../../components/RoundedButton';

const HomeScreen = () => {

  const isFocused = useIsFocused();
  
  return(
    <View style={styles.main}>
        <View style={styles.container}>
          { 
            isFocused ?    
              <TaskList /> 
            : 
              <View/>
          }
        </View>
        <View style={styles.bottomView}>
          <RoundedButton/>
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    backgroundColor: '#ddd',
    flex: 1
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
  },
  bottomView:{
    alignItems: 'flex-end'
  }
});

export default HomeScreen;
