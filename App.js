import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from './components/Home'
import Data from './components/Data';
export default function App() {

  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <Data></Data>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  text: {
    textAlign: 'center',
  },
});
