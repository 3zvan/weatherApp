import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import MyText from '../components/MyText';
import { WeatherData } from '../models/weatherData.model';
import DetailText from '../components/DetailText';
import { unixTimeConverter, dateDisplayConverter } from '../converters/displayConverter';
import Colors from '../constants/Colors';

interface MainProps {
    data: WeatherData;
    fetchMethod: () => void;
}

type Gradient = {
    startColor: string,
    endColor: string,
}

const MainScreen = (props: MainProps) => {
    const [gradientColors, setGradientColors] = useState<Gradient>({ startColor: '#fff', endColor: '#fff' });

    useEffect(() => {
        switch (Math.floor(props.data.weather[0].id / 100)) {
            case 2:
                setGradientColors({ startColor: Colors.stormLight, endColor: Colors.stormDark });
                break;
            case 3:
            case 5:
            case 7:
            case 9:
                setGradientColors({ startColor: Colors.rainLight, endColor: Colors.rainDark });
                break;
            case 6:
                setGradientColors({ startColor: Colors.snowLight, endColor: Colors.snowDark });
                break;
            case 8:
                setGradientColors({ startColor: Colors.clearLight, endColor: Colors.clearDark });
                break;
            default:
                return;
        }
    }, [props.data.weather[0].id]);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[gradientColors.startColor, gradientColors.endColor]}
                start={[0, 0]}
                end={[0, 1]}
                style={styles.gradientStyle} />
            <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={props.fetchMethod}>
                        <MaterialIcons name='refresh' size={32} color='rgba(0,0,0,.6)' />
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
                        <MaterialIcons name='keyboard-arrow-down' size={24} />
                        <MyText text={`${Math.round(props.data.main.temp_min)}°C`} />
                    </View>
                    <View style={styles.largeTemp}>
                        <MyText text={`${Math.round(props.data.main.temp)}°C`} style={{ fontSize: 36 }} />
                    </View>
                    <View style={styles.smallTemp}>
                        <MyText text={`${Math.round(props.data.main.temp_max)}°C`} />
                        <MaterialIcons name='keyboard-arrow-up' size={24} />
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
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
    },
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerBar: {
        height: 42,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16
    },
    weatherTitleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
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
        alignItems: 'center',
        flexDirection: 'row'
    },
    largeTemp: {
        flex: 2,
        alignItems: 'center'
    },
    gradientStyle: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    }
});

export default MainScreen;