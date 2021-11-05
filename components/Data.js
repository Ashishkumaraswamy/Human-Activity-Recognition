import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope, DeviceMotion } from 'expo-sensors';
import * as Speech from 'expo-speech'

var gx, gy, gz;
var ax, ay, az;
var gax,gay,gaz;
var t_gyroscope = [];
var t_accelerometer = [];
var t_accelerometergravity = []

export default function Data() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const insertData = () => {
        console.log(JSON.stringify({ gyroscope: t_gyroscope, accelerometer: t_accelerometer, accelerometer_gravity: t_accelerometergravity }));
        fetch('https://human-activity-recognitionml.herokuapp.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gyroscope: t_gyroscope, accelerometer: t_accelerometer, accelerometer_gravity: t_accelerometergravity })
        })
            .then(resp => resp.text())
            .then(response => console.log(response))
            // .then((json) => {
            //     var js = JSON.parse(json);
            //     console.log(js['output']);
            //     Speech.speak(js['output']);
            // })
            .catch(error => console.log(error))
    }
    const [subscription, setSubscription] = useState(null);

    Accelerometer.setUpdateInterval(20);
    Gyroscope.setUpdateInterval(20);
    DeviceMotion.setUpdateInterval(20);
    const _subscribe = () => {
        setSubscription(

            DeviceMotion.addListener(deviceMotiondata => {
                ax = deviceMotiondata.acceleration.x;
                ay = deviceMotiondata.acceleration.y;
                az = deviceMotiondata.acceleration.z;
                setData(deviceMotiondata.acceleration);
                t_accelerometer.push([ax, ay, az]);
                // console.log(ax)
                gax = deviceMotiondata.accelerationIncludingGravity.x;
                gay = deviceMotiondata.accelerationIncludingGravity.y;
                gaz = deviceMotiondata.accelerationIncludingGravity.z;
                t_accelerometergravity.push([gax, gay, gaz]);
            }),
            // Accelerometer.addListener(accelerometerData => {
            //     ax = accelerometerData.x;
            //     ay = accelerometerData.y;
            //     az = accelerometerData.z;
            //     setData(accelerometerData);
            //     t_accelerometer.push([ax, ay, az]);
            //     // console.log(ax)
            // }),
            Gyroscope.addListener(gyroscopeData => {
                gx = gyroscopeData.x;
                gy = gyroscopeData.y;
                gz = gyroscopeData.z;
                t_gyroscope.push([gx, gy, gz]);
                // console.log(ax, ay, az);
                // console.log(t_gyroscope.length);
                if (t_gyroscope.length === 100) {
                    // console.log("here");
                    // console.log(t_gyroscope);
                    // console.log(t_accelerometergravity);
                    insertData();
                    t_accelerometer = [];
                    t_accelerometergravity = [];
                    t_gyroscope = [];
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
                x: {round(ax)} y: {round(ay)} z: {round(az)}
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


