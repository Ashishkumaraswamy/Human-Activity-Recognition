import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

function Home() {
    return (
        <View>
            <View style={style.container}>
                <Text style={style.today}>Today</Text>
                <View style={style.firstRow}>
                    <View style={style.activitycontainer}>
                        <Text style={style.activityText}>Walking</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.activityText}>Standing</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.activityText}>Jogging</Text>
                    </View>
                </View>
                <View style={style.secondRow}>
                    <View style={style.activitycontainer}>
                        <Text style={style.activityText}>Sitting</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.activityText}>Upstairs</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.activityText}>Downstairs</Text>
                    </View>
                </View>
            </View>
            <View style={style.bottomcontainer}>
                <View style={style.navigator}>
                    <Text style={{ left: 5, fontSize: 18 }}>Predictions</Text>
                    <Text style={{ left: -20, fontSize: 16 }}>Details</Text>
                    <Text style={{ left: -20, fontSize: 16 }}>Data</Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
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
    today: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'sans-serif'
    },
    firstRow: {
        paddingHorizontal: '5%',
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 45,
    },
    secondRow: {
        paddingHorizontal: '5%',
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50,
    },
    activitycontainer: {
        marginTop: 30,
        position: 'relative',
        width: 90,
        height: 120,
        alignItems: 'center',
    },
    activityText: {
        fontSize: 15,
        color: 'black',
        position: 'absolute',
        bottom: 0
    },
    navigator: {
        position: 'absolute',
        width: '100%',
        bottom: 20,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})
export default Home
