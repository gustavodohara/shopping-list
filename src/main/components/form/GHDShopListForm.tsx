import {FieldArray, Formik} from 'formik';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as yup from 'yup';

import {PRIMARY} from '../../styles/colors';
import GHDButton from '../GHDButton';
import DropdownInputFormikValidator from './DropdownInputFormikValidator';
import InputFormikValidator from './InputFormikValidator';
import GHDTodoItemFormik from './GHDTodoItemFormik';


const styles = StyleSheet.create({
    button: {
        borderColor: PRIMARY,
        borderWidth: 2
    },
    buttonAddItem: {
        marginTop: 20,
    },
    buttons: {
        paddingTop: 10,
        paddingBottom: 5
    }
});

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .label('Nombre')
        .required(),
    storeId: yup
        .number()
        .label('Tienda')
        .typeError('Este campo es obligatorio')
        .required(),
    items: yup.array()
        .of(
            yup.object().shape({
                is_completed: yup
                    .boolean()
                    .notRequired(),
                description: yup
                    .string()
                    .label('Descripcion')
                    .typeError('Este campo es oblicagorio')
                    .required()

            })
        )
        .notRequired()
});

const formatForDropdown = items => {
    return items.map(item => ({
        value: item.id,
        label: item.name
    }));
};

interface Props {
    action?: any;
    initialValues?: any;
    readOnly?: boolean;
    submitLabel?: string;
    stores?: any[]
}

const GHDShopListForm = ({
                             submitLabel,
                             action,
                             initialValues,
                             stores,
                             readOnly
                         }: Props) => {
    const [storesDropdown, setStoresDropdown] = useState([]);

    useEffect(() => {
        if (stores) {
            setStoresDropdown(formatForDropdown(stores));
        }
    }, [stores]);

    const onSubmit = (values, actions) => {
        // console.log('onSubmit', values);
        // let obj = null;
        // const items = values.items.map(({is_new, id, description, is_completed}) => {
        const newItems = [...values.items];
        const itemsMapped = newItems.map((el) => {
            const obj = el.is_new ? {
                description: el.description,
                is_completed: el.is_completed,
                id: -1 // I do now why, but if i do not set an id it is created a new one with a random number
            } : {
                id: el.id,
                description: el.description,
                is_completed: el.is_completed,
            };
            //
            return obj;
        });

        const variables = {
            name: values.name,
            storeId: +values.storeId,
            items: itemsMapped
        };

        action({variables});
        actions.setSubmitting(false);
    };

    const addNewItem = (arrayItems) => {
        arrayItems.unshift({
            description: '',
            is_completed: false,
            is_new: true,
        })
    };

    const noop = () => {
    };

    const onCheckTodoItems = (item, check) => {
        // console.log("onCheckTodoItems", item, check);
        if (readOnly) {
            const listShopItem = {
                ...item,
                is_completed: check
            };
            action(listShopItem);
        } else {
            noop();
        }
    };

    const removeTodoItem = (form, index) => {
        const newItems = [...form.values.items];
        newItems.splice(index, 1);

        form.setFieldValue(
            "items",
            newItems
        );
        // console.log("removeTodoItem newItems", newItems, values.items);
    };

    const getInitialValues = () => {
        const newInit = {...initialValues};
        if (initialValues.items) {
            newInit.items = [...initialValues.items]
        }
        return newInit;
    };

    const createOrUpdate = !readOnly;

    return (
        <Formik
            initialValues={getInitialValues()}
            onSubmit={(data, actions) => {
                onSubmit(data, actions);
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
        >
            {formikProps => (
                <>
                    <InputFormikValidator
                        label="Nombre"
                        formikProps={formikProps}
                        formikKey="name"
                        placeholder="Nombre"
                        disabled={readOnly}
                    />

                    <DropdownInputFormikValidator
                        items={storesDropdown}
                        label="Tiendas"
                        formikProps={formikProps}
                        formikKey="storeId"
                        placeholder="Tienda"
                        disabled={readOnly}
                    />

                    <FieldArray name="items">
                        {({form, ...fieldArrayHelpers}) => {
                            // console.log("render FIELDArray form.values.items", form.values.items);
                            if (!form.values.items) {
                                return null
                            }
                            return (
                                <>
                                    {
                                        form.values.items.map((item, index) => (
                                            <GHDTodoItemFormik
                                                key={`todo-${index}`}
                                                index={index}
                                                style={{}}
                                                edit={createOrUpdate}
                                                onCheck={check => {
                                                    onCheckTodoItems(item, check)
                                                }}
                                                onRemove={() => fieldArrayHelpers.remove(index) /*removeTodoItem(form, index)*/}
                                            />
                                        ))
                                    }
                                    {
                                        createOrUpdate ? <GHDButton
                                            style={[styles.button, styles.buttonAddItem]}
                                            onPress={() => addNewItem(fieldArrayHelpers)}
                                        >
                                            Add Item
                                        </GHDButton> : null
                                    }
                                </>
                            )
                        }}
                    </FieldArray>
                    {
                        createOrUpdate ? <View style={styles.buttons}>
                            <GHDButton
                                style={[styles.button, styles.button]}
                                loading={formikProps.isSubmitting}
                                onPress={formikProps.handleSubmit as any}
                            >
                                {submitLabel}
                            </GHDButton>
                        </View> : null
                    }
                </>
            )}
        </Formik>
    );
};

export default GHDShopListForm;
