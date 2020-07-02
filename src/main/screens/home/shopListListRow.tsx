import * as React from 'react';
import {useEffect, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FlatList, StyleSheet, Text, View, Animated, I18nManager} from 'react-native';
import {RectButton} from "react-native-gesture-handler";
import {HIGHLIGHT_MAIN, HIGHLIGHT_SECOND} from '../../styles/colors';
import { DataTable } from 'react-native-paper';
import {NEW_SHOP_LIST_NAVIGATOR_KEY} from '../../config/constants';

const styles = StyleSheet.create({
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10
    },
    columnBig: {
        flex: 6,
        justifyContent: 'flex-start'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,

        justifyContent: 'center'
    },
    rightActions: {
        width: 192,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
    },
    text: {
        fontSize: 14,
        // fontFamily: 'lato-bold'
    },
    title: {
        fontSize: 32,
    },
});

export const ShopListListRow = ({ navigation, shopList, extraClass}) => {
    const [swipeableRow, setSwipeableRow] = useState(null);

    const close = () => {
        if (swipeableRow) {
            swipeableRow.close();
        }
    };

    const updateRef = (ref: any) => {
        setSwipeableRow(ref);
    };

    const onRemove = () => {
        console.log("onRemove")
    };

    const onClick = (id: number) => {
        navigation.navigate(NEW_SHOP_LIST_NAVIGATOR_KEY, {id});
    };

    const onClone = () => {
        console.log("onClone")
    };

    const renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: any,
        onPress: any,
        id: number
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0]
        });
        const pressHandler = () => {
            close();
            onPress(id);
        };
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
                <RectButton
                    style={[styles.rightAction, {backgroundColor: color}]}
                    onPress={pressHandler}
                >
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (progress: any) => (
        <View style={styles.rightActions}>
            {renderRightAction(
                'CLONE',
                HIGHLIGHT_MAIN,
                192,
                progress,
                onClone,
                shopList.id
            )}
            {renderRightAction(
                'REMOVE',
                HIGHLIGHT_SECOND,
                128,
                progress,
                onRemove,
                shopList.id
            )}
        </View>
    );

    return (
        <Swipeable
            ref={updateRef}
            friction={2}
            renderRightActions={progress =>
                renderRightActions(progress)
            }
            leftThreshold={30}
            rightThreshold={40}
        >
            <DataTable.Row
                key={shopList.id}
                style={[extraClass]}
                onPress={() => {
                    onClick(shopList.id);
                }}
            >
                <DataTable.Cell style={[styles.columnBig]}>
                    <Text style={styles.text}>{`${shopList.name}`}</Text>
                </DataTable.Cell>
            </DataTable.Row>
        </Swipeable>
    )
}
