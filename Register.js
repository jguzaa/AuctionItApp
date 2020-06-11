import * as React from 'react';
import { Text, View, Image, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

export function Register({ navigation, route }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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

            <Text>Telephone No</Text>
            <TextInput
                style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
            //onChangeText={text => onChangeText(text)}
            //value={value}
            />

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

