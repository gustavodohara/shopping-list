import * as React from 'react';
import {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IRootState} from '../../reducers';
import {connect} from 'react-redux';
import {NavigationRouteProp, RootStackParamList} from '../../navigations/app-navigator-with-tab';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

type ProfileScreenRouteProp = NavigationRouteProp<RootStackParamList, 'Settings'>;

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Settings'
    >;

type NavigationProps = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};

export interface ISettingsScreenProps extends StateProps, DispatchProps, NavigationProps {
}

class SettingsScreen extends Component<ISettingsScreenProps> {

    render() {
        return (
            <View style={styles.container}>
                <Text>Settings Screen</Text>
            </View>
        );
    }
}


const mapStateToProps = ({ main }: IRootState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({

});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsScreen);
