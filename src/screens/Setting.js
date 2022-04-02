import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet } from 'react-native'
import { Settings } from 'react-native-web'

const Setting = ({ navigation }) => {
  return (
    <SafeAreaView edges={['top']}>
      <Text style={{ fontSize: 50 }}>Setting</Text>
    </SafeAreaView>
  )
}

export default Setting