import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GHDShopListForm from '../../components/form/GHDShopListForm';

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    fontSize: 18
  },
  header: {
    marginTop: 8,
    marginBottom: 16
  },
  inputs: {},
});

const ShopListCreateView = ({ initialValues, createShopList, stores }) => {

  const onSubmit = (action, data) => {
    console.log('data', data);
    const values = data.variables;
    const variables = {
      date: new Date(),
      name: values.name,
      storeId: +values.storeId,
    };
    console.log('variables', variables);

    action( variables );
  };

  return (
      <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={100}
          viewIsInsideTabBar
          style={styles.container}
      >
        <ScrollView>
          <Text style={[styles.h1, styles.header]}>NEW SHOP LIST</Text>
          <View style={styles.inputs}>
            <GHDShopListForm
                action={data => onSubmit(createShopList, data)}
                initialValues={initialValues}
                submitLabel="Create"
                stores={stores}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
  );
};

export default ShopListCreateView;
