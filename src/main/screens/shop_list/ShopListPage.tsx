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
import {createShopListsAction, getShopListsAction} from '../../actions/shopList';
import {getStoreAction} from '../../actions/store';
import {convertObjectIntoArray} from '../../services/utils';
import {HOME_NAVIGATOR_KEY} from '../../config/constants';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
});

type ProfileScreenRouteProp = NavigationRouteProp<RootStackParamList, 'NewShopList'>;

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'NewShopList'
    >;

type NavigationProps = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};

interface IShopListState {
    name: string;
    shopId: number;
}

export interface IShopListProps extends StateProps, DispatchProps, NavigationProps {
}


const initState = {
    name: '',
    shodId: null
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

    private handleCreateStores = () => (data) => {
        const { createStores } = this.props;
        createStores(data, this.onCompleted, this.onError)
    };

    componentDidMount() {
        const { getStores } = this.props;
        getStores();
    }

    render() {
        const { stores, navigation } = this.props;
        const {
            name,
            shopId,
        } = this.state;

        // const shopListId = navigation.getParam('shopListId', null);
        // const isCreate = shopListId === null;
        const isCreate = true;

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
                                createShopList={this.handleCreateStores()}
                                stores={stores}
                            />
                        )}
                        {/* update opportunity */}
                        {!isCreate && null}
                    </Card.Content>
                </Card>
            </SafeAreaView>
        );
    }


};

const mapStateToProps = ({ main }: IRootState) => {

    const stores = convertObjectIntoArray(main.stores);

    return {
        stores
    }
};

const mapDispatchToProps = (dispatch) => ({
    getStores: () => dispatch(getStoreAction(null, null)),
    createStores: (data, onSuccess = null, onFail = null) => dispatch(createShopListsAction(data, onSuccess, onFail)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopListScreen);
