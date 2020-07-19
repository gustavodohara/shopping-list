import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import GHDShopListForm from '../../components/form/GHDShopListForm';
import GHDButton from '../../components/GHDButton';
import {PRIMARY} from '../../styles/colors';
import {MODE_UPDATE, SHOP_LIST_ITEM_NAVIGATOR_KEY} from '../../config/constants';
import {useEffect, useState} from 'react';

const styles = StyleSheet.create({
    button: {
        borderColor: PRIMARY,
        borderWidth: 2
    },
    buttons: {
        paddingTop: 10,
        paddingBottom: 5
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
        console.log('actualizando item chequeado', data, initState);
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
        <ScrollView>
            <Text style={[styles.h1, styles.header]}>COMPRANDO...</Text>
            <View style={styles.inputs}>
                <GHDShopListForm
                    action={data => onSubmit(updateItem, data)}
                    initialValues={initState}
                    stores={stores}
                    readOnly
                />
            </View>
            <View style={styles.buttons}>
                <GHDButton
                    style={[styles.button, styles.button]}
                    onPress={goToUpdate}
                >
                    ACTUALIZAR DATOS
                </GHDButton>
            </View>
        </ScrollView>
    );
};

export default ShopListReadView;
