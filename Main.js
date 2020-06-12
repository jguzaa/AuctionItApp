import * as React from 'react';
import { Text, View, Image, StyleSheet, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

import { Button } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

var userId = null;

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

const Tab = createBottomTabNavigator();

export function Main({ navigation, route }) {

    console.log(route.params);

    const { data } = route.params;
    userId = JSON.stringify(data);

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'md-home' : 'md-home';
                    } else if (route.name === 'Create') {
                        iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                    } else if (route.name === 'Manage') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Create" component={CreateScreen} />
            <Tab.Screen name="Manage" component={ManageScreen} />
        </Tab.Navigator>

    );
}

//=======================Screen===============================

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{userId}</Text>
        </View>
    );
}

function CreateScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Create!</Text>
        </View>
    );
}

function ManageScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Manage!</Text>
        </View>
    );
}

