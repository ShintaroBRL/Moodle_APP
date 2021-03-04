import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';

import { 
    Avatar, Title, Caption, Paragraph, Drawer
 } from "react-native-paper";

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import { AuthContext } from '../components/context';

export function DrawerContent(props){

    const { AuthSignOut } = React.useContext(AuthContext);
    const [userName, setUserName] = React.useState("");
    const [userLevel, setUserLevel] = React.useState(1);

    useEffect(()=>{
        try {
            AsyncStorage.getItem('userData').then((data) => {
                setUserName(JSON.parse(data).name);
                setUserLevel(JSON.parse(data).type);
            }).catch(error => {
                console.log("Error");
                console.log(error);
            })
        } catch (error) {
            Alert.alert("Error while getting name!");
        }
    }, [])

    
    let adminSection = (userLevel == -1)? 
        <Drawer.Section title="Administração" style={styles.drawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="google-classroom"
                    color={color}
                    size={size}
                    />
                )}
                label="Classes"
                onPress={() => {}}
            />
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="account-circle-outline"
                    color={color}
                    size={size}
                    />
                )}
                label="Usuarios"
                onPress={() => {}}
            />
        </Drawer.Section>
      : null;

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg'
                                }}
                                size={50}
                            />
                        </View>
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>{userName}</Title>
                            <Caption style={styles.caption}>@{userName}</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="home-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="book-open-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Conteudos"
                        onPress={() => {props.navigation.navigate('Conteudos')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="book-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Trabalhos"
                        onPress={() => {props.navigation.navigate('Trabalhos')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="file-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Avaliações"
                        onPress={() => {props.navigation.navigate('Avaliacoes')}}
                    />
                </Drawer.Section>

                <Drawer.Section title="Propriedades" style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="cog-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Settings"
                        onPress={() => {props.navigation.navigate('Settings')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="bell-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Notifications"
                        onPress={() => {}}
                    />
                </Drawer.Section>

                {adminSection}
                
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon 
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={()=>{AuthSignOut()}}
                />
            </Drawer.Section>

        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      flexDirection: 'row',
      marginTop: 15
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
});