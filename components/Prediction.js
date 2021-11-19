import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope, DeviceMotion } from 'expo-sensors';
import { Table, Row, Rows } from 'react-native-table-component';

var gx, gy, gz;
var ax, ay, az;
var gax, gay, gaz;
var t_gyroscope = [];
var t_accelerometer = [];
var t_accelerometergravity = []
var biking = 0, standing = 0, sitting = 0, downstairs = 0, upstairs = 0, walking = 0, jogging = 0;

export default function Prediction() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const insertData = () => {
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
                biking = js['output'][0];
                downstairs = js['output'][1];
                jogging = js['output'][2];
                sitting = js['output'][3];
                standing = js['output'][4];
                upstairs = js['output'][5];
                walking = js['output'][6];
                console.log("biking:" + biking + "\ndownstairs:" + downstairs + "\njogging:" + jogging + "\nsitting:" + sitting + "\nStanding:" + standing + "\nUpstairs:" + upstairs + "\nwalking:" + walking + "\n\n")
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

    var tableHead = ['Activity', 'Probability'];
    var tableData = [
        ['Biking', biking],
        ['Downstairs', downstairs],
        ['Jogging', jogging],
        ['Sitting', sitting],
        ['Standing', standing],
        ['Upstairs', upstairs],
        ['Walking', walking],
    ]

    const { x, y, z } = data;
    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={tableData} textStyle={styles.text} />
            </Table>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFBE6A',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        // marginLeft: "30",
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
});
