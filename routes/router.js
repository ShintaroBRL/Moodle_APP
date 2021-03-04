import React from 'react';
import { useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../views/Splash';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';

import Index from '../views/Index';
import Settings from '../views/Settings';
import Avaliacoes from '../views/Avaliacoes';
import Conteudos from '../views/Conteudos';
import Trabalhos from '../views/Trabalhos';

import { DrawerContent } from '../views/DrawerContent';
import { AuthContext } from '../components/context';
import { Login, Register } from '../models/AuthModel';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default App = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.name,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.name,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(()=>({
    AuthSignIn: async(userName, password) =>{
      await Login(userName,password,dispatch);
    },
    AuthSignOut: async() => {
      try {
        await AsyncStorage.removeItem('userData');
      } catch(e) {
        console.log(e);
      }
      dispatch({type:"LOGOUT"});
    },
    AuthSignUp: async(userName, password) => {
      /*let userToken = 'asdasd';
      dispatch({type:"REGISTER", id: userName, token: userToken});*/
      await Register(userName,password,dispatch);
    }
  }));

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = JSON.parse(await AsyncStorage.getItem('userData')).token;
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if(loginState.isLoading){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken == null ? (
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        ):(
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Index}/>
            <Drawer.Screen name="Trabalhos" component={Trabalhos}/>
            <Drawer.Screen name="Conteudos" component={Conteudos}/>
            <Drawer.Screen name="Avaliacoes" component={Avaliacoes}/>
            <Drawer.Screen name="Settings" component={Settings}/>
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
