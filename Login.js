import * as React from 'react';
import { Text, View, Image, StyleSheet, TextInput } from 'react-native';

import { Button } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

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
            //onChangeText={text => onChangeText(text)}
            //value={value}
            />

            <Text>Password</Text>
            <TextInput
                style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
            //onChangeText={text => onChangeText(text)}
            //value={value}
            />

            <Button 
                icon="login" 
                style={{ marginTop: 10 }} 
                mode="contained" 
                onPress={() => console.log('Pressed')}>
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

