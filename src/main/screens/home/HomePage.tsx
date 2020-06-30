import * as React from 'react';
import {Component} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import Constants from 'expo-constants';

import {IRootState} from '../../reducers';
import {connect} from 'react-redux';
import {getShopListsAction} from '../../actions/shopList';
import {convertObjectIntoArray} from '../../services/utils';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export interface IHomeProps extends StateProps, DispatchProps {
}

function Item({ title  }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export class HomeScreen extends Component<IHomeProps> {

    componentDidMount() {
        const { getShopLists } = this.props;
        getShopLists();
    }

    // const [list, setList] = useState<IShopList[]>([]);
    // useEffect(() => {
    // }, []);
    //
    // const onPressAdd = async () => {
    //     const item: IShopList = {
    //         name: 'test',
    //         date: 'testdate',
    //         store: 1,
    //         items: []
    //     };
    //
    //     await ListService.getInstance().add(item);
    //     const listStored = await ListService.getInstance().get();
    //     console.log('onPressAdd', listStored);
    //     const listParsed = JSON.stringify(listStored);
    //     setList(listParsed);
    // };
    //
    // const onPressRemove = async () => {
    //     let listStored = await ListService.getInstance().get();
    //     const first = listStored.pop();
    //     if (first && first.id) {
    //         await ListService.getInstance().remove(first.id);
    //         listStored = await ListService.getInstance().get();
    //         console.log('onPressRemove listStored', listStored);
    //         const listParsed = JSON.stringify(listStored);
    //         setList(listParsed)
    //     }
    //
    // };

    render() {
        const {shopLists} = this.props;
        console.log("shopLists", shopLists);
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={shopLists}
                    renderItem={({item}) => <Item title={item.name}/>}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }


};

const mapStateToProps = ({ main }: IRootState) => {

    const shopLists = convertObjectIntoArray(main.shopLists);

    return {
        shopLists
    }
};

const mapDispatchToProps = (dispatch) => ({
    getShopLists: () =>
        dispatch(getShopListsAction(null, null)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);
