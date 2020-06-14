import * as React from 'react';
import { Text, View, Image, StyleSheet, TextInput, Button, Dimensions, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import ImagePicker from 'react-native-image-picker'
import axiosClient from 'axios'

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
    imageContainer: {
        backgroundColor: '#fe5b29',
        height: 200,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    uploadContainer: {
        backgroundColor: '#f6f5f8',
        width: Dimensions.get('window').width,
        height: 200,
    },
    uploadContainerTitle: {
        alignSelf: 'center',
        fontSize: 25,
        margin: 20,
        fontFamily: 'Roboto'
    },
    uploadButton: {
        borderRadius: 16,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 5,
        },
        shadowOpacity: 1.58,
        shadowRadius: 9,
        elevation: 4,
        margin: 10,
        padding: 10,
        backgroundColor: '#fe5b29',
        width: Dimensions.get('window').width - 60,
        alignItems: 'center'
    },
    uploadButtonText: {
        color: '#f6f5f8',
        fontSize: 20,
        fontFamily: 'Roboto'
    }
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

    const [photoUri, setPhotoUri] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

    const selectPhotoTapped = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {

            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                const type = response.type;
                const name = response.fileName;
                const path = response.path;
                const source = {
                    uri,
                    type,
                    name,
                }
                console.log(source)
                //setPhotoUri(source.uri)
                cloudinaryUpload(response)

            }
        });

        const cloudinaryUpload = (photo) => {

            const cloudName = 'dkthn2rrz';
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

            const formData = new FormData()
            formData.append("api_key", '927137781937745');
            formData.append("file", 'data:image/jpg;base64,' + photo.data);
            //formData.append("public_id", "sample_image");
            formData.append("timestamp", Date.now() / 1000);
            formData.append("upload_preset", 'dkthn2rrzup');



            axiosClient
                .post(url, formData)
                .then((result) => {
                    console.log(result.data.secure_url)

                    setPhotoUri(result.data.secure_url)

                    alert("Upload completed")
                })
                .catch((err) => {
                    console.log(err);
                    alert("An Error Occured While Uploading")
                })

            /*fetch(url, {
                method: "post",
                body: formData
            }).then(res => res.json()).
                then(data => {
                    setPhoto(data.secure_url)

                }).catch(err => {
                    alert("An Error Occured While Uploading")
                })*/
        }

    }

    return (
        <View>
            <View style={styles.imageContainer}>
                <Image style={styles.backgroundImage} source={{ uri: photoUri }}></Image>
            </View>
            <View style={styles.uploadContainer}>
                <Text style={styles.uploadContainerTitle}>Create Auction</Text>
                <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
            </View>

        </View >
    );
}

function ManageScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Manage!</Text>
        </View>
    );
}

