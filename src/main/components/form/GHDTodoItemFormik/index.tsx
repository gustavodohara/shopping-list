import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Checkbox, TextInput} from 'react-native-paper';
import {useField} from 'formik';
import GHDTodoItemFormikEdit from './GHDTodoItemFormikEdit';
import GHDTodoItemFormikRead from './GHDTodoItemFormikRead';


const styles = StyleSheet.create({
    container: {
        marginVertical: 5
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
    keyboardType?: any;
    edit: boolean;
    onCheck: any;
    onRemove: any;
}

const GHDTodoItemFormik = ({
                               index,
                               style = {},
                               keyboardType = 'default',
                               edit,
                               onCheck,
                               onRemove
                           }: Props) => {
    // Binding `isCompleted` using index of TODO array
    const [completedField, completeMetas, completeHelpers] = useField({
        name: `items[${index}].is_completed`,
        type: "checkbox"
    });
    // Binding `content` using index of items array
    const [descriptionField, descriptionMeta, descriptionHelpers] = useField(`items[${index}].description`);
    const [idField, idMeta, idHelpers] = useField(`items[${index}].id`);

    const onDescriptionInput = (text: string) => {
        descriptionHelpers.setValue(text);
        onDescriptionBlur();
    };
    const onDescriptionBlur = () => {
        descriptionHelpers.setTouched(true);
    };

    const onCheckChange = (check: boolean) => {
        onCheck(check);
        completeHelpers.setValue(check);
    };

    const getErrorOrNull = () => {
        return descriptionMeta.touched ? descriptionMeta.error : null;
    };

    // console.log("render descriptionField", descriptionField);
    console.log("render descriptionMeta ", descriptionMeta);
    console.log("render idField", idField);

    return (
        <View>
            {
                edit ?
                    <GHDTodoItemFormikEdit
                        index={index}
                        style={style}
                        keyboardType={keyboardType}
                        checked={!!completedField.checked}
                        onCheckChange={completeHelpers.setValue}
                        onCheckBlur={() => completeHelpers.setTouched(true)}
                        description={descriptionField.value}
                        onDescriptionChange={descriptionHelpers.setValue}
                        onDescriptionBlur={() => descriptionHelpers.setTouched(true)}
                        onRemove={onRemove}
                        errorMessage={getErrorOrNull()}
                    />
                    :
                    <GHDTodoItemFormikRead
                        description={descriptionField.value}
                        checked={!!completedField.checked}
                        onCheck={onCheckChange}
                    />
            }
            <Text>id field {idField.value}</Text>
        </View>
    );
};

export default GHDTodoItemFormik;
