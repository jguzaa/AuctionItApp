import * as React from 'react';
import { Text, View, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import ImagePicker from 'react-native-image-picker'
import axiosClient from 'axios'
import { Button } from 'react-native-paper';


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
    },
    item: {
        backgroundColor: '#FFDFA3',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        width: Dimensions.get('window').width - 60,
        borderRadius: 16,
    },
    title: {
        fontSize: 32,
    },
});

const Tab = createBottomTabNavigator();

export function Main({ navigation, route }) {

    //console.log(route.params);

    const { data } = route.params;
    userId = JSON.stringify(data);
    userId = userId.replace(/"/g, '');

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

function HomeScreen({ navigation, route }) {

    const [auctionList, setAcList] = useState([]);
    const [selected, setSelected] = useState(new Map());

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);

            axiosClient
                .post('http://192.168.1.126:3000/auction_select/', {
                    item_id: id
                })
                .then(function (response) {

                    console.log(response.data.data)

                    navigation.navigate("Auction", {
                        item: response.data.data,
                        uid: userId,
                    });

                })
                .catch(function (error) {
                    console.log(error);
                    alert('ERROR Try again later');
                })

            
        },
        [selected],
    );

    function Item({ id, title, imguri, selected, onSelect }) {
        return (
            <TouchableOpacity
                onPress={() => onSelect(id)}
                style={[
                    styles.item,
                ]}
            >
                <Text style={styles.title}>{title}</Text>
                <Image style={{ height: 100 }} source={{ uri: imguri }}></Image>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <FlatList
                data={auctionList}
                renderItem={({ item }) =>
                    <Item
                        id={item._id}
                        title={item.name}
                        imguri={item.photouri}
                        selected={!!selected.get(item._id)}
                        onSelect={onSelect}

                    />}
                keyExtractor={item => item._id}
                extraData={selected}
            />


            <Button
                icon="refresh"
                style={{
                    marginTop: 10,
                    marginBottom: 20
                }}
                mode="contained"
                onPress={() => {
                    axiosClient
                        .get('http://192.168.1.126:3000/auction/')
                        .then(function (response) {

                            console.log(response.data.data)
                            setAcList(response.data.data)

                        })
                        .catch(function (error) {
                            console.log(error);
                            alert('ERROR Try again later');
                        })
                }}>
                refresh
            </Button>

        </View>
    );
}

function CreateScreen() {

    const [photoUri, setPhotoUri] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');


    const create = () => {
        axiosClient
            .post('http://192.168.1.126:3000/create_auction/', {
                pname: name,
                pdes: des,
                pprice: price,
                pdate: date,
                pphotouri: photoUri,
                puid: userId
            })
            .then(function (response) {

                console.log(response)
                alert('Created auction');

            })
            .catch(function (error) {
                console.log(error);
                alert('ERROR Try again later');
            })
    }

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


        }

    }

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image style={styles.backgroundImage} source={{ uri: photoUri }}></Image>
            </View>
            <View style={styles.uploadContainer}>
                <Text style={styles.uploadContainerTitle}>Create Auction</Text>
                <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <Text>Product name</Text>
                <TextInput
                    style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={name => setName(name)}
                    defaultValue={name}
                />

                <Text style={{ paddingTop: 10 }}>Description</Text>
                <TextInput
                    style={{
                        height: 80,
                        width: 300,
                        borderColor: 'gray',
                        borderWidth: 1,
                    }}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={des => setDes(des)}
                    defaultValue={des}
                />

                <Text>Start price</Text>
                <TextInput
                    style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={price => setPrice(price)}
                    defaultValue={price}
                />

                <Text>End date (DD/MM/YYYY)</Text>
                <TextInput
                    style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={date => setDate(date)}
                    defaultValue={date}
                />


                <TouchableOpacity onPress={create} style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Create</Text>
                </TouchableOpacity>


            </View>

        </ScrollView >
    );
}

function ManageScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Manage!</Text>
        </View>
    );
}

