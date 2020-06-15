import * as React from 'react';
import { Text, View, Image, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

import { Button } from 'react-native-paper';


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    Logo: {
        width: 150,
        height: 150,
    },
    h1: {
        fontWeight: "bold",
        fontSize: 30,
    },
});

export function Login({ navigation, route }) {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={styles.Logo}
                source={require('./images/logo.png')}
            />
            <Text style={styles.h1} >Auctionit</Text>

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

            <Button
                icon="login"
                style={{ marginTop: 10 }}
                mode="contained"
                onPress={() => {
                    axios
                        .post('http://192.168.1.126:3000/login/', {
                            username: user,
                            password: pass
                        })
                        .then(function (response) {

                            console.log(response)
                            if (response.data.data === "notFound") {
                                alert('Incorrect username or password')
                                
                            } else {
                                alert('Login successful');
                                navigation.navigate("Main", response.data)
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                            alert('ERROR Try again later');
                        })
                }}>
                Log in
            </Button>

            <Button
                icon="account-plus"
                style={{ marginTop: 30 }}
                mode="contained"
                onPress={() => navigation.navigate("Register")}>
                Register
            </Button>


        </View>
    );
}

