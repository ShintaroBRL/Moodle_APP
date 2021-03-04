import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { styles } from '../styles/styles'

import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

 const Conteudos = () => {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default ConteudosStackScreen = ({navigation}) => {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#f98012'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <Stack.Screen name="Conteudos" component={Conteudos} options={{
        title: 'Conteudos',
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} iconStyle={{marginLeft:10}}
          backgroundColor='#f98012' onPress={() => {navigation.openDrawer()}}
          ></Icon.Button>
        )
      }}/>
    </Stack.Navigator>
  )
}