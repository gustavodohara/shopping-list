import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Checkbox, TextInput} from 'react-native-paper';
import {useField} from 'formik';


const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    completed: {
        backgroundColor: 'red'
    },
    description: {

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
