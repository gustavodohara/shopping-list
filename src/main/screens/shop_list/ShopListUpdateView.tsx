import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import GHDShopListForm from '../../components/form/GHDShopListForm';
import {IShopList} from '../../services/interfaces/interfaces';
import {useEffect, useState} from 'react';
import {COLOR_ONE} from '../../styles/colors';

const styles = StyleSheet.create({
    container: {},
    h1: {
        textAlign: 'center',
        fontSize: 24,
        color: COLOR_ONE
    },
    header: {
        marginTop: 8,
        marginBottom: 16
    },
    inputs: {},
});

const ShopListUpdateView = ({shopList, updateShopList, stores}) => {
    // const [shopList, setShopList] = useState({});
    const [initialValues, setInitialValues] = useState({});

    // useEffect(() => {
    //     if (initialValues) {
    //       setShopList(initialValues)
    //     }
    // }, [initialValues]);

    useEffect(() => {
        if (shopList) {
            // const initial = {
            //     id: shopList.id,
            //     name: shopList.name,
            //     storeId: shopList.storeId
            //     itemsf
            // };
            setInitialValues(shopList);
        }
    }, [shopList]);

    const onSubmit = (action: Function, data: any) => {
        const values = data.variables;
        const variables = {
            id: initialValues.id,
            date: new Date(),
            name: values.name,
            storeId: +values.storeId,
            items: values.items,
        };

        action(variables);
    };

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={100}
            viewIsInsideTabBar
            style={styles.container}
        >
            <ScrollView>
                <Text style={[styles.h1, styles.header]}>ACTUALIZAR LISTA DE COMPRAS</Text>
                <View style={styles.inputs}>
                    <GHDShopListForm
                        action={(data: any) => onSubmit(updateShopList, data)}
                        initialValues={initialValues}
                        submitLabel="Update"
                        stores={stores}
                    />
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ShopListUpdateView;
