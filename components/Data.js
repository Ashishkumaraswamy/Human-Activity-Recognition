import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope, DeviceMotion } from 'expo-sensors';
import * as Speech from 'expo-speech'
import { Table, Row, Rows } from 'react-native-table-component';

var gx, gy, gz;
var ax, ay, az;
var gax, gay, gaz;
var t_gyroscope = [];
var t_accelerometer = [];
var t_accelerometergravity = []
var output = '';
export default function Data() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const insertData = () => {
        fetch('https://human-activity-recognitionml.herokuapp.com/send', {
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
                Speech.speak(js['output']);
                output = js['output'];
            }
            )
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
                if (t_gyroscope.length >= 100 && t_accelerometergravity.length >= 100 && t_accelerometer.length >= 100) {
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
    gx = round(gx);
    gy = round(gy);
    gz = round(gz);
    ax = round(ax);
    ay = round(ay);
    az = round(az);
    var tableHead = ['Sensors', 'X', 'Y', 'Z'];
    var tableData = [
        ['Accelerometer', ax, ay, az],
        ['Gyroscope', gx, gy, gz],
    ]

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={tableData} textStyle={styles.text} />
            </Table>
            <Text style={styles.prediction}>Prediction: {output}</Text>
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
        backgroundColor: '#FFBE6A',
    },
    head:
    {
        height: 40,
    },
    text:
    {
        margin: 6,
        justifyContent: 'center',
        textAlign: 'center',
    },
    prediction:
    {
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    }
});


