import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, Text,  TextInput} from 'react-native-paper';
import {useField} from 'formik';


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    completed: {
        backgroundColor: 'red'
    },
    description: {
        fontSize: 22,
        paddingTop: 2,
        paddingBottom: 2
    },
});

interface Props {
    description: string;
    checked: boolean;
    onCheck: any;
}

const GHDTodoItemFormikRead = ({
                                   description,
                                   checked,
                                   onCheck
                               }: Props) => {

    const checkItem = () => {
        onCheck(!checked);
    };

    return (
        <View style={styles.container} onTouchEnd={checkItem}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                // onPress={checkItem}
            />
            <Text style={styles.description}>{description}</Text>
        </View>

    );
};

export default GHDTodoItemFormikRead;
