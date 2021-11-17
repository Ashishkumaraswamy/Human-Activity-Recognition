import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from './components/Home'
import Data from './components/Data';
export default function App() {
  const [state, setState] = useState('Homep');    
  const [change, setChange] = useState(0);   
  useEffect(() => {
    // Update the document title using the browser API
    {state === 'Homep' && <Home></Home>}
    {state === 'add-trip' && <Data></Data>}
  });

  return (
    
    <><View style={styles.container}>
      
      {change === 'Homep' && <Home></Home>}
      {change === 'Details' && <Data></Data>}

    </View><View style={styles.bottomcontainer}>
        <View style={styles.navigator}>

          <TouchableOpacity onPress={() => setState('Homep')}>
            <Text style={{ left: 5, fontSize: 16 }}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setState('add-trip')}>
            <Text style={{ left: -20, fontSize: 16 }}>Predictions</Text>
          </TouchableOpacity>

          {/* <Text style={{ left: -20, fontSize: 16 }}>Data</Text> */}
        </View>
      </View></>
      
      // {/* <Data></Data> */}
  
  );
}
const styles = StyleSheet.create({

  container: {
    top: 30,
    position: 'relative',
    width: '100%',
    height: '60%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: 'orange',
    alignItems: 'center',
},
  
  bottomcontainer: {
    position: 'relative',
    height: '40%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
  },
  navigator: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},
});
