import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, View, Text, StyleSheet } from 'react-native'
import Map from '../components/Map'
const MapScreen = ({ navigation }) => {
    return (
    <SafeAreaView edges={['bottom']}>
        <Button           
            title='Search location'
            onPress={() => navigation.navigate('MapSearchScreen')}/>
        <Map />
    </SafeAreaView>
)
}

export default MapScreen