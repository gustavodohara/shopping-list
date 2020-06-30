import * as React from 'react';
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {IShopList, ListService} from '../../services/ListService';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const HomeScreen = () => {
    const [list, setList] = useState('');
    useEffect(() => {

    });

    const onPressAdd = async () => {
        const item: IShopList = {
            name: 'test',
            date: 'testdate',
            store: 1,
            items: []
        };

        await ListService.getInstance().add(item);
        const listStored = await ListService.getInstance().get();
        console.log('onPressAdd', listStored);
        const listParsed = JSON.stringify(listStored);
        setList(listParsed);
    };

    const onPressRemove = async () => {
        let listStored = await ListService.getInstance().get();
        const first = listStored.pop();
        if (first && first.id) {
            await ListService.getInstance().remove(first.id);
            listStored = await ListService.getInstance().get();
            console.log('onPressRemove listStored', listStored);
            const listParsed = JSON.stringify(listStored);
            setList(listParsed)
        }

    };

    return (
        <View style={styles.container}>
            <Text>Home Screen {list}</Text>
            <Button onPress={onPressAdd} title='ADD ITEM'/>
            <Button onPress={onPressRemove} title='REMOVE ITEM'/>
        </View>
    );
}
