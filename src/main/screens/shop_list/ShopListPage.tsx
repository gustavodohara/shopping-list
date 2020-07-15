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
import {HOME_NAVIGATOR_KEY} from '../../config/constants';
import {IShopList} from '../../services/interfaces/interfaces';
import ShopListUpdateView from './ShopListUpdateView';


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
    name: string;
    shopId: number | null;
}

export interface IShopListProps extends StateProps, DispatchProps, NavigationProps {
}


const initState: IShopListState = {
    name: '',
    shopId: null
};



class ShopListScreen extends Component<IShopListProps, IShopListState> {
    constructor(props) {
        super(props);
        this.onCompleted = this.onCompleted.bind(this);
        this.onError = this.onError.bind(this);
        this.state = {
            ...initState
        };
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
        // const { createShopList } = this.props;
        // createShopList(data, this.onCompleted, this.onError)
    };

    private getShopListById(id: number): IShopListState {

    }

    componentDidMount() {
        const {getStores} = this.props;
        getStores();
    }

    render() {
        const {stores, navigation, route} = this.props;
        const {
            name,
            shopId,
        } = this.state;

        const shopListId = route.params.id || null;
        const isCreate = shopListId === null;

        return (
            <SafeAreaView style={styles.container}>
                <Card style={styles.container}>
                    <Card.Content>
                        {/* create shop list */}
                        {isCreate && (
                            <ShopListCreateView
                                navigation={navigation}
                                initialValues={{
                                    name,
                                    shopId
                                }}
                                createShopList={this.handleCreateShopList()}
                                stores={stores}
                            />
                        )}
                        {/* update opportunity */}
                        {!isCreate && (
                            <ShopListUpdateView
                                shopListId={shopListId}
                                initialValues={{
                                    name,
                                    shopId
                                }}
                                updateShopList={this.handleCreateShopList()}
                                stores={stores}
                            />
                        )}
                    </Card.Content>
                </Card>
            </SafeAreaView>
        );
    }


};

const mapStateToProps = ({main}: IRootState) => {

    const stores = convertObjectIntoArray(main.stores);

    return {
        stores
    }
};

const mapDispatchToProps = (dispatch) => ({
    getStores: () => dispatch(getStoreAction(null, null)),
    createShopList: (data, onSuccess = null, onFail = null) => dispatch(createShopListsAction(data, onSuccess, onFail)),
    updateShopList: (item: IShopList, onSuccess = null, onFail = null) => dispatch(updateShopListsAction(item, onSuccess, onFail)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopListScreen);
