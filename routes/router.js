import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import Index from '../views/Index';
import Splash from '../views/Splash';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import { DrawerContent } from '../views/DrawerContent';

const Drawer = createDrawerNavigator();
const IndexStack = createStackNavigator();

const IndexStackScreen = ({navigation}) => {
  return(
    <IndexStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <IndexStack.Screen name="Home" component={Index} options={{
        title: 'Home',
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} iconStyle={{marginLeft:10}}
          backgroundColor='#009387' onPress={() => {navigation.openDrawer()}}
          ></Icon.Button>
        )
      }}/>
    </IndexStack.Navigator>
  )
}

const Main = () => {
  return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={IndexStackScreen}/>
        </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
