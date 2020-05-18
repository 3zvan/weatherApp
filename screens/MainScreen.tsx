import React from 'react';
import { View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import MyText from '../components/MyText';
import { WeatherData } from '../models/weatherData.model';
import DetailText from '../components/DetailText';
import { unixTimeConverter, dateDisplayConverter } from '../converters/displayConverter';

interface MainProps {
    data: WeatherData;
    fetchMethod: () => void;
}

const MainScreen = (props: MainProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={props.fetchMethod}>
                    <MaterialIcons name='refresh' size={24} />
                </TouchableOpacity>
            </View>
            <MyText text={`${props.data.name}, ${props.data.sys.country}`} style={{ fontSize: 28 }} />
            <MyText text={dateDisplayConverter(new Date())} />
            <View style={styles.weatherTitleContainer}>
                <View>
                    <Image source={{ uri: `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png` }} style={{ height: 100, width: 100 }} />
                </View>
                <View>
                    <MyText text={props.data.weather[0].main} style={{ fontSize: 24 }} />
                    <MyText text={props.data.weather[0].description} />
                </View>
            </View>
            <View style={styles.tempContainer}>
                <View style={styles.smallTemp}>
                    <MyText text={`${Math.round(props.data.main.temp_min)}°C`} />
                </View>
                <View style={styles.largeTemp}>
                    <MyText text={`${Math.round(props.data.main.temp)}°C`} style={{ fontSize: 36 }} />
                </View>
                <View style={styles.smallTemp}>
                    <MyText text={`${Math.round(props.data.main.temp_max)}°C`} />
                </View>
            </View>
            <View>
                <DetailText label='Wind:' value={`${props.data.wind.speed} km/h`} windDirection={props.data.wind.deg} />
                <DetailText label='Humidity:' value={`${props.data.main.humidity} %`} />
                <DetailText label='Pressure:' value={`${props.data.main.pressure} hPa`} />
                <DetailText label='Clouds:' value={`${props.data.clouds.all} %`} />
                <DetailText label='Sunrise:' value={unixTimeConverter(props.data.sys.sunrise)} />
                <DetailText label='Sunset:' value={unixTimeConverter(props.data.sys.sunset)} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 32,
    },
    headerBar: {
        height: 28,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16
    },
    weatherTitleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tempContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 48,
    },
    smallTemp: {
        flex: 1,
        alignItems: 'center'
    },
    largeTemp: {
        flex: 2,
        alignItems: 'center'
    }
});

export default MainScreen;