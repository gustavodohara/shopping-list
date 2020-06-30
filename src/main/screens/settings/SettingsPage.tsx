import * as React from 'react';
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
        </View>
    );
}
