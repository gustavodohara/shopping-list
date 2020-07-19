import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import {useField} from 'formik';


const styles = StyleSheet.create({
    checkbox: {
        margin: 5
    },
    container: {
        // marginVertical: 5,
        display: 'flex',
        flexDirection: 'row'
    },
    completed: {
        backgroundColor: 'red'
    },
    inputField: {
        borderColor: 'black',
        paddingTop: 0.25,
        paddingBottom: 0.25,
        borderRadius: 0,
        backgroundColor: 'white',
        height: 35,
        fontSize: 16,
        fontFamily: 'lato-regular'
    },
});

interface Props {
    index: number;
    style: any;
    keyboardType: any;
    description: string;
    checked: boolean;
    onCheckChange: any;
    onCheckBlur: any;
    onDescriptionChange: any;
    onDescriptionBlur: any;
    onRemove: any;
}

const GHDTodoItemFormikEdit = ({
                                   keyboardType = 'default',
                                   description,
                                   checked,
                                   onCheckChange,
                                   onCheckBlur,
                                   onDescriptionChange,
                                   onDescriptionBlur,
                                   onRemove
                               }: Props) => {

    const onDescriptionInput = (text: string) => {
        onDescriptionChange(text);
        onDescriptionBlur();
    };

    // console.log("render descriptionField", descriptionField);
    // console.log("render descriptionMeta", descriptionMeta);

    return (
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    onCheckChange(!checked);
                    onCheckBlur(true)
                }}
            />
            <TextInput
                keyboardType={keyboardType}
                mode="outlined"
                style={{
                    ...styles.inputField,
                }}
                placeholder={'descripcion'}
                value={description}
                onChangeText={onDescriptionInput}
                onBlur={onDescriptionBlur}
                // error={hasError}
                // disabled={disabled}
            />
            <Button onPress={onRemove}>Remove</Button>
            {/*{hasError && (*/}
            {/*    <HelperText type="error">{formikProps.errors[formikKey]}</HelperText>*/}
            {/*)}*/}
            {/*<Text>completedField</Text>*/}
        </View>

    );
};

export default GHDTodoItemFormikEdit;
