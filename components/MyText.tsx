import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface textProps {
    text: string,
    style: StyleSheet
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