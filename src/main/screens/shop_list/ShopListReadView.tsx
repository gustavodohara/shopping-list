import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import GHDShopListForm from '../../components/form/GHDShopListForm';
import GHDButton from '../../components/GHDButton';
import {COLOR_FOURTEEN, COLOR_ONE, PRIMARY} from '../../styles/colors';
import {MODE_UPDATE, SHOP_LIST_ITEM_NAVIGATOR_KEY} from '../../config/constants';
import {useEffect, useState} from 'react';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    button: {
        borderColor: PRIMARY,
        borderWidth: 2
    },
    buttons: {
        paddingTop: 10,
        paddingBottom: 5
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    h1: {
        fontSize: 24,
        color: COLOR_ONE
    },
    header: {
        marginBottom: 10
    },
    shopListContainer: {
        height: '90%'
    }
});

const initialState = {
    name: '',
    storeId: null,
    items: [],
};

const ShopListReadView = ({navigation, shopList, updateItem, stores}) => {
    const [initState, setInitState] = useState(initialState);

    useEffect(() => {
        if (shopList) {
            // console.log("shoplistreadview", shopList);
            setInitState(shopList);
        }
    }, [shopList]);

    const onSubmit = (action, data) => {
        action(data)
        // const values = data.variables;
        // const variables = {
        //   date: new Date(),
        //   name: values.name,
        //   storeId: +values.storeId,
        // };
        // console.log('variables', variables);
        //
        // action( variables );
    };

    const goToUpdate = () => {
        const {id} = shopList;
        navigation.navigate(SHOP_LIST_ITEM_NAVIGATOR_KEY, {id, mode: MODE_UPDATE});
    };

    return (
        <View>
            <ScrollView style={styles.shopListContainer}>
                <Text style={[styles.h1, styles.header]}>COMPRANDO...</Text>
                <View style={styles.inputs}>
                    <GHDShopListForm
                        action={data => onSubmit(updateItem, data)}
                        initialValues={initState}
                        stores={stores}
                        readOnly
                    />
                </View>
            </ScrollView>
            <View style={styles.buttons}>
                <GHDButton
                    style={[styles.button, styles.button]}
                    onPress={goToUpdate}
                >
                    ACTUALIZAR DATOS
                </GHDButton>
            </View>
        </View>

    );
};

export default ShopListReadView;
