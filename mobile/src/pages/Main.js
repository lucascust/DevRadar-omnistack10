// Página com mapa da aplicação

import React, { useState, useEffect } from 'react';
// USAR LIB KEYBOARD PARA DESAFIO DA BARRA SUBIR COM O TECLADO
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api'
import { connect, disconnect, subscribeToNewDevs } from '../services/socket'



function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrenRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            
            // Confirma autorização do usuário
            if(granted){
                const location = await getCurrentPositionAsync({
                    // get position com GPS
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = location.coords;

                setCurrenRegion ({
                    latitude,
                    longitude,
                    // Calculo naval para Zoom inicial
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }

        }

        loadInitialPosition();
    }, []);

    // Função para previnir problema de setDevs levar muito tempo e o setup executar antes
    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...dev, dev]));
    }, [devs])

    function setupWebsocket() {
        // metodo para evitar duplicar conexões
        disconnect();
        // envio parametros para filtragem na hora do connect
        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs,
        );
    };

    // Carrega os Devs no mapa ao realizar pesquisa
    async function loadDevs() {
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            latitude,
            longitude,
            techs
        });

        setDevs(response.data.devs);
        // Função de tempo real apenas a partir da primeira busca do usuário
        setupWebsocket();
    }

    function handleRegionChanged(region) {
        setCurrenRegion(region);

    }

    if (!currentRegion){
        return null;    
    }

    return (
        <>
        <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map} >
            {devs.map(dev => (
                <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinate[1], longitude: dev.location.coordinate[1]}}>
                <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                
                {/* Interior Callout executado quando avatar é clicado */}
                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: dev.github_username })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio} </Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>

            </Marker>
            ))}
        </MapView>
        <View style={styles.searchForm}>
            <TextInput 
            style={styles.searchInput}
            placeholder="Buscar Devs por tecnologias..."
            placeholderTextColor='#999'
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
            />

            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles =  StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    // Caixa que abre ao clicar no Dev
    callout:{
        width: 260
    },
    // Textos ao clicar em um Dev no mapa
    devName:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio:{
        color: '#666',
        marginTop: 5,
    },
    devTechs:{
        marginTop:5
    },

    // Barra de pesquisa
    searchForm:{
        position: "absolute",
        // MUDAR PARA BOTTOM PARA REALIZAR DESAFIO DO TECLADO
        top: 20,
        left: 20,
        right:20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color:'#333',
        borderRadius: 5,
        paddingHorizontal: 20,
        fontSize: 16,
        // Shadow para iOS
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        // Shadow para Android
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }


})


export default Main;