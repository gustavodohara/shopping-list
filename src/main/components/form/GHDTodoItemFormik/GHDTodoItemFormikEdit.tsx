import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Checkbox, HelperText, TextInput} from 'react-native-paper';
import {useField} from 'formik';


const styles = StyleSheet.create({
    checkbox: {},
    checkboxContainer: {
        // marginTop: 50,

        paddingTop: 5,
        paddingBottom: 5
    },
    container: {
        // marginVertical: 5,
        display: 'flex',
    },
    completed: {
        backgroundColor: 'red'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    inputField: {
        flexGrow: 2,
        borderColor: 'black',
        paddingTop: 0.25,
        paddingBottom: 0.25,
        borderRadius: 0,
        backgroundColor: 'white',
        height: 35,
        fontSize: 20,
        fontFamily: 'lato-regular'
    },
    error: {

    }
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
    errorMessage: any;
}

const GHDTodoItemFormikEdit = ({
                                   keyboardType = 'default',
                                   description,
                                   checked,
                                   onCheckChange,
                                   onCheckBlur,
                                   onDescriptionChange,
                                   onDescriptionBlur,
                                   onRemove,
                                   errorMessage
                               }: Props) => {

    const onDescriptionInput = (text: string) => {
        onDescriptionChange(text);
        onDescriptionBlur();
    };

    const hasError = !!errorMessage;

    // console.log("render descriptionField", descriptionField);
    // console.log("render descriptionMeta", descriptionMeta);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            onCheckChange(!checked);
                            onCheckBlur(true)
                        }}
                    />
                </View>

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
            </View>

            {hasError && (
                <HelperText style={styles.error} type="error">{errorMessage}</HelperText>
            )}
        </View>

    );
};

export default GHDTodoItemFormikEdit;
