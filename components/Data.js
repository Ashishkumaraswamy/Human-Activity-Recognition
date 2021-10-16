import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
var gx, gy, gz;
var t_gyroscope = [];
var t_accelerometer = [];

export default function Data() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const insertData = () => {
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        fetch('https://human-activity-recognitionml.herokuapp.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gyroscope: t_gyroscope, accelerometer: t_accelerometer })
        })
            .then(resp => resp.json())
            .then((json) => console.log(json))
            .catch(error => console.log(error))
    }
    const [subscription, setSubscription] = useState(null);

    Accelerometer.setUpdateInterval(20);
    Gyroscope.setUpdateInterval(20);

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData);
                t_accelerometer.push([data.x, data.y, data.z]);
            }),
            Gyroscope.addListener(gyroscopeData => {
                gx = gyroscopeData.x;
                gy = gyroscopeData.y;
                gz = gyroscopeData.z;
                t_gyroscope.push([gx, gy, gz]);
                // console.log(ax, ay, az);
                // console.log(t_gyroscope.length);
                if (t_gyroscope.length === 128) {
                    // console.log("here");
                    // console.log(t_gyroscope);
                    // console.log(t_accelerometer);
                    t_accelerometer = t_accelerometer.slice(64, 128);
                    t_gyroscope = t_gyroscope.slice(64, 128);
                    insertData();
                }
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {

        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;
    // console.log(ax, ay, az);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
            <Text style={styles.text}>
                x: {round(x)} y: {round(y)} z: {round(z)}
            </Text>
            <Text style={styles.text}>Gyroscope:</Text>
            <Text style={styles.text}>
                x: {round(gx)} y: {round(gy)} z: {round(gz)}
            </Text>
        </View>
    );
}

function round(n) {
    if (!n) {
        return 0;
    }
    return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
    },
});


