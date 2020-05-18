import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import MyText from '../components/MyText';
import MainScreen from './MainScreen';
import { WeatherData } from '../models/weatherData.model';

type FetchStatus = "inProgress" | "done" | "failed";

const LoadingScreen = () => {
    const [isFetched, setIsFetched] = useState<FetchStatus>("inProgress");
    const [fetchedData, setFetchedData] = useState<WeatherData | null>(null);

    const fetchData = () => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Budapest&units=metric&appid=a1400cec09afef0be604508a5579e6c4')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFetchedData(data);
                setIsFetched("done");
            })
            .catch((err) => Alert.alert(err.toString()));
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (isFetched === "inProgress") {
        return (
            <View style={styles.container}>
                <MyText text='Fetching from API endpoint...' />
            </View>
        );
    }

    if (isFetched === "failed") {
        return (
            <View style={styles.container}>
                <MyText text='Fetching from API endpoint failed. Please check your internet connection and try again.' />
            </View>
        )
    }

    if (isFetched === "done" && fetchedData) {
        return (
            <MainScreen data={fetchedData} fetchMethod={fetchData} />
        );
    }

    return (
        <View style={styles.container}>
            <MyText text='Internal error' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoadingScreen;