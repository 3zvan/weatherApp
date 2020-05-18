import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import MyText from './MyText';

type DetailProps = {
    label: string,
    value: string,
    windDirection?: number
}

let windDirection: number;

const DetailText = (props: DetailProps) => {
    console.log(props.windDirection ? props.windDirection : '');
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <MyText text={props.label} style={styles.label} />
            </View>
            <View style={styles.valueContainer}>
                {props.windDirection &&
                    <MaterialIcons name='arrow-upward' size={16} style={{ transform: [{ rotate: `${props.windDirection}deg` }] }} />}
                <MyText text={props.value} style={styles.value} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 32,
        paddingVertical: 8,
        flexDirection: 'row'
    },
    labelContainer: {
        flex: 1,
    },
    valueContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    label: {

    },
    value: {

    }
});

export default DetailText;