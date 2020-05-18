import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface textProps {
    text: string,
    style?: TextStyle
}

const MyText = (props: textProps) => {
    return <Text style={{...styles.text, ...props.style}}>{props.text}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: 'roboto'
    }
});

export default MyText;