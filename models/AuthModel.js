import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export async function Login(userName,password,dispatch){

    let userData = {
        user: userName,
        pass: password
    }

    axios.post('http://192.168.0.112:8101/api/login',userData)
    .then((response) => {
        AsyncStorage.setItem('userData', JSON.stringify(response.data)).then(() => {
            dispatch({type:"LOGIN", name: response.data.name, token: response.data.token});
        });
    }).catch(error => {
        if(error.response.status == "404"){
            Alert.alert("Usuario ou senha invalidos!");
        }else{
            Alert.alert("Error desconhecido");
        }
    })

}

export async function Register(userName,password,dispatch){

    let userData = {
        user: userName,
        pass: password,
    }

    axios.post('http://192.168.0.112:8101/api/register',userData)
    .then((response) => {
        AsyncStorage.setItem('userData', JSON.stringify(response.data)).then(() => {
            dispatch({type:"REGISTER", name: response.data.name, token: response.data.token});
        });
    }).catch(error => {
        if(error.response.status == "404"){
            Alert.alert("Usuario ou senha invalidos!");
        }else{
            Alert.alert("Error desconhecido");
            console.log(error);
        }
    })

}

export async function getAllUsers(){

    console.log("getAllUsers Called!!");

    AsyncStorage.getItem('userToken').then((token) => {
        axios.get('http://192.168.0.112:8101/api/usuarios',{ 'headers': { 'token': token } }).then((response) => {
            console.log(response.data);
        }).catch(error => {
            if(error.response.status == "401"){
                Alert.alert("Acesso não autorizado!");
            }else{
                Alert.alert("Error desconhecido");
            }
        })
    }).catch(error => {
        console.log(error);
    })


}