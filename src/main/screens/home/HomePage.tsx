import * as React from 'react';
import {Component} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'expo-constants';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

import {IRootState} from '../../reducers';
import {
    cleanAllShopListsAction, cloneShopListsAction,
    getShopListsAction,
    removeShopListsAction,
    updateShopListsAction
} from '../../actions/shop-list';
import {convertObjectIntoArray} from '../../services/utils';
import {
    NavigationRouteProp,
    RootStackParamList
} from '../../navigations/app-navigator-with-tab';
import {SHOP_LIST_ITEM_NAVIGATOR_KEY} from '../../config/constants';
import {ShopListList} from './shopListList';
import {getShopListItemsAction} from '../../actions/shop-list-item';
import {IShopList} from '../../services/interfaces/interfaces';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});

type ProfileScreenRouteProp = NavigationRouteProp<RootStackParamList, 'Home'>;

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'Home'>;

type NavigationProps = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};

export interface IHomeProps extends StateProps, DispatchProps, NavigationProps {
}

export class HomeScreen extends Component<IHomeProps> {

    componentDidMount() {
        const {getShopLists, getShopListItems} = this.props;
        getShopLists();
        getShopListItems();
    }

    onPressAdd = () => {
        const {navigation} = this.props;
        navigation.navigate(SHOP_LIST_ITEM_NAVIGATOR_KEY);
    };

    // handleOnClone(data) {
    //     const {cloneShopList} = this.props;
    //     cloneShopList(data);
    // };

    render() {
        const {shopLists, navigation, cloneShopList} = this.props;
        const {removeShopList} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ShopListList
                    shopLists={shopLists}
                    navigation={navigation}
                    onDelete={removeShopList}
                    onClone={cloneShopList}
                />
                <Button onPress={this.onPressAdd} title="New List"/>
            </SafeAreaView>
        );
    }


};

const mapStateToProps = ({main}: IRootState) => {

    const shopLists = convertObjectIntoArray(main.shopLists);

    return {
        shopLists
    }
};

const mapDispatchToProps = (dispatch) => ({
    getShopLists: () => dispatch(getShopListsAction(null, null)),
    getShopListItems: () => dispatch(getShopListItemsAction(null, null)),
    removeShopList: (id: number, onSuccess = null, onFail = null) => dispatch(removeShopListsAction(id, onSuccess, onFail)),
    cloneShopList: (data: IShopList, onSuccess = null, onFail = null) => dispatch(cloneShopListsAction(data, onSuccess, onFail)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);
