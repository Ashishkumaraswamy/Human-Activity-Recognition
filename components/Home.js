import React ,{useState} from 'react'
import { View, Text, Button, Linking,StyleSheet, Pressable ,TouchableOpacity} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Data from './Data';


function Home() {
    return (
        <View>
                <Text style={style.today}>Today</Text>
                <View style={style.firstRow}>
                    <View style={style.activitycontainer}>
                        <Text style={style.timer}>5h 18m</Text>
                        <FontAwesome5 name="walking" size={28} color="black" style={style.icons} />
                        <Text style={style.activityText}>Walking</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.timer}>5h 18m</Text>
                        <MaterialCommunityIcons name="human-male" size={35} color="black" style={style.icons} />
                        <Text style={style.activityText}>Standing</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.timer}>5h 18m</Text>
                        <FontAwesome5 name="running" size={28} color="black" style={style.icons} />
                        <Text style={style.activityText}>Jogging</Text>
                    </View>
                </View>
                <View style={style.secondRow}>
                    <View style={style.activitycontainer}>
                        <Text style={style.timer}>5h 18m</Text>
                        <FontAwesome5 name="chair" size={28} color="black" style={style.icons} />
                        <Text style={style.activityText}>Sitting</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.timer}>5h 18m</Text>
                        <MaterialCommunityIcons name="stairs-up" size={35} color="black" style={style.icons} />
                        <Text style={style.activityText}>Upstairs</Text>
                    </View>
                    <View style={style.activitycontainer}>
                        <Text style={style.timer}>5h 18m</Text>
                        <MaterialCommunityIcons name="stairs-down" size={35} color="black" style={style.icons} />
                        <Text style={style.activityText}>Downstairs</Text>
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
        top: 25,
    },
    secondRow: {
        paddingHorizontal: '5%',
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 70,
    },
    activitycontainer: {
        marginTop: 30,
        position: 'relative',
        width: 90,
        height: 120,
        alignItems: 'center',
        backgroundColor: '#FFBE6A',
        borderRadius: 15,
    },
    activityText: {
        fontSize: 15,
        color: 'black',
        position: 'absolute',
        bottom: 15
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
    timer: {
        position: 'absolute',
        top: 10,
        color: 'white',
        fontSize: 18,
    },
    icons: {
        position: 'relative',
        marginTop: 45
    }
})
export default Home
