import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope, DeviceMotion } from 'expo-sensors';
import * as Speech from 'expo-speech'

var gx, gy, gz;
var ax, ay, az;
var gax, gay, gaz;
var t_gyroscope = [];
var t_accelerometer = [];
var t_accelerometergravity = []
var biking, standing, sitting, downstairs, upstairs, walking, jogging;

export default function Prediction() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const insertData = () => {
        // console.log(JSON.stringify({ gyroscope: t_gyroscope, accelerometer: t_accelerometer, accelerometer_gravity: t_accelerometergravity }));
        fetch('https://human-activity-recognitionml.herokuapp.com/sendprob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gyroscope: t_gyroscope, accelerometer: t_accelerometer, accelerometer_gravity: t_accelerometergravity })
        })
            .then(resp => resp.text())
            .then(response => {
                var js = JSON.parse(response);
                console.log(js['output']);
                biking = js['output'][0][0];
                downstairs = js['output'][0][1];
                jogging = js['output'][0][2];
                sitting = js['output'][0][3];
                standing = js['output'][0][4];
                upstairs = js['output'][0][5];
                walking = js['output'][0][6];
            }
            )
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
            Gyroscope.addListener(gyroscopeData => {
                gx = gyroscopeData.x;
                gy = gyroscopeData.y;
                gz = gyroscopeData.z;
                t_gyroscope.push([gx, gy, gz]);
                // console.log(ax, ay, az);
                // console.log(t_gyroscope.length);
                if (t_gyroscope.length >= 100 && t_accelerometergravity.length >= 100 && t_accelerometer.length >= 100) {
                    // console.log("here");
                    // console.log(t_gyroscope);
                    // console.log(t_accelerometergravity);
                    t_accelerometer = t_accelerometer.slice(0, 100);
                    t_accelerometergravity = t_accelerometergravity.slice(0, 100);
                    t_gyroscope = t_gyroscope.slice(0, 100);
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
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Biking : {biking}</Text>
            <Text style={styles.text}>Downstairs : {downstairs}</Text>
            <Text style={styles.text}>Jogging : {jogging}</Text>
            <Text style={styles.text}>Sitting : {sitting}</Text>
            <Text style={styles.text}>Standing : {standing}</Text>
            <Text style={styles.text}>Upstairs : {upstairs}</Text>
            <Text style={styles.text}>Walking : {walking}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
        marginTop: 10,
    },
});
