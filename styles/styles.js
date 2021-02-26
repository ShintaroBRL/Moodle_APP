import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    login_input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 20 ,
        textAlign: 'center',
        width: '50%',
        margin: 2
    },
    login_button:{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 2,
        alignSelf: "flex-start",
        marginLeft: '25%',
        borderRadius: 20 ,
        width: '20%',
    }
});