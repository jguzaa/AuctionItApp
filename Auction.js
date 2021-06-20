import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import axiosClient from 'axios'

//change server ip
const IP = 'http://192.168.5.80:3000'

export function Auction({ navigation, route }) {

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


    const { item } = route.params;
    const { uid } = route.params;

    const [offerprice, setOfferPrice] = useState('');
    const [price, setPrice] = useState(item.price);

    const doAuction = () => {

        //check offer price should more than the old price
        if (offerprice <= item.price) {
            alert("wrong offer price")
        } else {

            //send the new price to server with updated buyer user id
            axiosClient
                .post(IP + '/doauction/', {
                    buyer_id: uid,
                    item_id: item._id,
                    price: offerprice
                })
                .then(function (response) {

                    console.log(response.data.data)
                    setPrice(offerprice)
                    alert("Auction complete")

                })
                .catch(function (error) {
                    console.log(error);
                    alert('ERROR Try again later');
                })

        }
    }

    //get seller detail for display
    const getseller = () => {

        axiosClient
            .post(IP + '/seller/', {
                user_id: item.uid
            })
            .then(function (response) {

                console.log(response.data.data)
                alert("Name : " + response.data.data.user + "\nPhone No : " + response.data.data.pNo)


            })
            .catch(function (error) {
                console.log(error);
                alert('ERROR Try again later');
            })

    }

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image style={styles.backgroundImage} source={{ uri: item.photouri }}></Image>
            </View>
            <View style={styles.uploadContainer}>
                <Text style={styles.uploadContainerTitle}>{item.name}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ paddingTop: 10 }}>Description</Text>
                <Text style={{ paddingTop: 5 }}>{item.description}</Text>

                <Text style={{ paddingTop: 20 }}>Current bid price</Text>
                <Text style={{ paddingTop: 5 }}>{price}</Text>


                <Text style={{ paddingTop: 20 }}>offer price</Text>
                <TextInput
                    style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1, marginTop: 5 }}
                    onChangeText={offerprice => setOfferPrice(offerprice)}
                    defaultValue={offerprice}
                />
                <TouchableOpacity onPress={doAuction} style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Do auction</Text>
                </TouchableOpacity>

                <Text style={{ paddingTop: 20 }}>End date</Text>
                <Text style={{ paddingTop: 5 }}>{item.date}</Text>


                <TouchableOpacity onPress={getseller} style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Contact seller</Text>
                </TouchableOpacity>


            </View>

        </ScrollView >
    );
}

