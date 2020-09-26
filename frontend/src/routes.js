import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import Home from './pages/Main';
import Create from './pages/Create';

import RoundedButton from './components/RoundedButton';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{ 
        headerStyle: { backgroundColor:  "#FF0164" }, 
        headerTintColor: "#FFF"
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Desafios' }}
        options={{
          headerRight: () => (
            <RoundedButton/>
          ),
        }}
      />
      <Stack.Screen 
        name="Create" 
        component={Create}
        options={{ title: 'Cadastro de Desafio' }}
      />
    </Stack.Navigator>
  );
}