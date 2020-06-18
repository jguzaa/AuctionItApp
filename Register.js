import * as React from 'react';
import {useState} from 'react';
import { Text, View, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

//const IP = 'http://172.20.10.12:3000'
const IP = 'http://192.168.1.126:3000'

export function Register({ navigation, route }) {

    //set state
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [pNo, setPNo] = useState('');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ paddingTop: 20 }}>Usename</Text>
            <TextInput
                style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={user => setUser(user)}
                defaultValue={user}
            />

            <Text>Password</Text>
            <TextInput
                style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={pass => setPass(pass)}
                defaultValue={pass}
            />

            <Text>Telephone No</Text>
            <TextInput
                style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={pNo => setPNo(pNo)}
                defaultValue={pNo}
            />

            <Button
                icon="account-plus"
                style={{ marginTop: 30 }}
                mode="contained"
                onPress={() => {
                    
                    //use axios for connect and send data to server for registration
                    axios
                    .post(IP + '/user_regis/',{
                        username: user,
                        password: pass,
                        phoneNo: pNo
                    })
                    .then(function(response){
                        console.log(response.data);
                        alert('Register successful');
                        navigation.navigate("Login")
                    })
                    .catch(function(error){
                        console.log(error);
                        alert('ERROR Try again later');
                    })
                }}>
                Register
            </Button>
        </View>
    );
}

