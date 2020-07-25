import * as React from 'react';
import {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import {Card} from 'react-native-paper';

import {IRootState} from '../../reducers';
import {connect} from 'react-redux';
import {NavigationRouteProp, RootStackParamList} from '../../navigations/app-navigator-with-tab';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import ShopListCreateView from './ShopListCreateView';
import {createShopListsAction, getShopListsAction, updateShopListsAction} from '../../actions/shop-list';
import {getStoreAction} from '../../actions/store';
import {convertObjectIntoArray} from '../../services/utils';
import {HOME_NAVIGATOR_KEY, MODE_CREATE, MODE_READ, MODE_UPDATE} from '../../config/constants';
import {IShopList, IShopListItem} from '../../services/interfaces/interfaces';
import ShopListUpdateView from './ShopListUpdateView';
import ShopListReadView from './ShopListReadView';
import {updateShopListItemsAction} from '../../actions/shop-list-item';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
});

type ProfileScreenRouteProp = NavigationRouteProp<RootStackParamList, 'ShopList'>;

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'ShopList'>;

type NavigationProps = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};

interface IShopListState {
}

export interface IShopListProps extends StateProps, DispatchProps, NavigationProps {
}

class ShopListScreen extends Component<IShopListProps, IShopListState> {
    constructor(props) {
        super(props);
        this.onCompleted = this.onCompleted.bind(this);
        this.onError = this.onError.bind(this);
        this.state = {};
    }

    private onCompleted() {
        const {navigation} = this.props;
        navigation.navigate(HOME_NAVIGATOR_KEY);
    };

    private onError() {
        console.log('on error create opp');
    };

    private handleCreateShopList = () => (data) => {
        const {createShopList} = this.props;
        createShopList(data, this.onCompleted, this.onError)
    };

    private handleUpdateShopList = () => (data) => {
        const {updateShopList} = this.props;
        updateShopList(data, this.onCompleted, this.onError)
    };

    private handleUpdateItem = (data) => {
        const {updateShopListItem} = this.props;
        updateShopListItem(data);
    };

    private getShopListById(id: number): IShopListState {

    }

    componentDidMount() {
        const {getStores} = this.props;
        getStores();
    }

    private getShopListIdIfExist() {
        const {route} = this.props;
        return (route.params && route.params.id) || null;
    }

    private getModeIfExist() {
        const {route} = this.props;
        return (route.params && route.params.mode) || null;
    }

    private getShopListMode = () => {
        const shopListId = this.getShopListIdIfExist();
        const mode = this.getModeIfExist();
        if (shopListId === null) {
            return MODE_CREATE
        } else if (mode) {
            return mode;
        } else {
            return MODE_READ;
        }
    };

    private rebuildShopLists = (shopListId) => {
        const {shopListItems, shopLists} = this.props;
        const shopList = {...shopLists[shopListId]};
        const itemIds = shopList.items || [];
        const items = itemIds.map( (id: number) => {
            return shopListItems[id]
        });
        // const items = shopListItems.filter((item: IShopListItem) => itemIds.includes(item.id))
        // console.log("rebuildShopLists items", items);
        shopList.items = items;
        return shopList;
    };

    render() {
        const {stores, navigation, shopLists} = this.props;

        const shopListId = this.getShopListIdIfExist();
        const mode = this.getShopListMode();

        return (
            <SafeAreaView style={styles.container}>
                <Card style={styles.container}>
                    <Card.Content>
                        {/* create shop list */}
                        {mode === MODE_CREATE ? (
                            <ShopListCreateView
                                navigation={navigation}
                                createShopList={this.handleCreateShopList()}
                                stores={stores}
                            />
                        ) : null}
                        {/* update opportunity */}
                        {mode === MODE_UPDATE ? (
                            <ShopListUpdateView
                                shopList={this.rebuildShopLists(shopListId)}
                                updateShopList={this.handleUpdateShopList()}
                                stores={stores}
                            />
                        ) : null}
                        {/* update opportunity */}
                        {mode === MODE_READ ? (
                            <ShopListReadView
                                navigation={navigation}
                                shopList={this.rebuildShopLists(shopListId)}
                                updateItem={this.handleUpdateItem}
                                stores={stores}
                            />
                        ) : null}
                    </Card.Content>
                </Card>
            </SafeAreaView>
        );
    }


};

const mapStateToProps = ({main}: IRootState) => {

    const stores = convertObjectIntoArray(main.stores);
    const shopLists = main.shopLists;
    const shopListItems = main.shopListItems;

    return {
        stores,
        shopLists,
        shopListItems,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getStores: () => dispatch(getStoreAction(null, null)),
    createShopList: (data, onSuccess = null, onFail = null) => dispatch(createShopListsAction(data, onSuccess, onFail)),
    updateShopList: (item: IShopList, onSuccess = null, onFail = null) => dispatch(updateShopListsAction(item, onSuccess, onFail)),
    updateShopListItem: (item: IShopListItem, onSuccess = null, onFail = null) => dispatch(updateShopListItemsAction(item, onSuccess, onFail)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopListScreen);
