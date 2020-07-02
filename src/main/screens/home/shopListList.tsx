import * as React from 'react';
import { StyleSheet} from 'react-native';
import {ShopListListRow} from './shopListListRow';
import { DataTable, Text } from 'react-native-paper';
import {useEffect, useState} from 'react';
import {IShopList} from '../../services/ShopListService';

const styles = StyleSheet.create({
    columnBig: {
        flex: 6,
        justifyContent: 'flex-start'
    },
    columnFull: {
        flex: 12,
        justifyContent: 'center'
    },
    h1: {
        fontSize: 14
    },
    header: {
        // fontFamily: 'lato-light'
    },
    even: {
        backgroundColor: '#F0F0F0'
    },
    odd: {},
    text: {
        fontSize: 14,
        // fontFamily: 'lato-bold'
    },
});

export const ShopListList = ({shopLists, navigation}) => {
    const [hasShopList, setHasShopList] = useState(false);

    useEffect(() => {
        if (shopLists && shopLists.length > 0) {
            setHasShopList(true)
        }
    }, [shopLists]);


    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ ...styles.columnBig }}>
            <Text style={[styles.h1, styles.header]}>Nombre</Text>
          </DataTable.Title>
        </DataTable.Header>
          {hasShopList ? (
              shopLists.map((shopList: IShopList, index: number) => {
                  const even = index % 2 === 1;
                  const extraClass = even ? styles.even : styles.odd;

                  return (
                      <ShopListListRow
                          key={`swipeable-${shopList.id}`}
                          shopList={shopList}
                          extraClass={extraClass}
                          navigation={navigation}
                      />
                  );
              })
          ) : (
              <DataTable.Row>
                  <DataTable.Cell style={[styles.columnFull]}>
                      <Text style={styles.text}>No tenes ninguna lista</Text>
                  </DataTable.Cell>
              </DataTable.Row>
          )}
      </DataTable>

        // <FlatList
        //     data={shopLists}
        //     renderItem={({item}) => <ShopListListRow title={item.name}/>}
        //     keyExtractor={item => `${item.id}` }
        // />
    )
}
