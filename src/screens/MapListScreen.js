import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet } from 'react-native'

const MapListScreen = ({ navigation }) => {
  return (
    <SafeAreaView edges={['top']}>
      <Text style={{ fontSize: 50 }}>MapListScreen</Text>
    </SafeAreaView>
  )
}

export default MapListScreen