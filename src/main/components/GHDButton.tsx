import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {PRIMARY} from '../styles/colors';

const classes = StyleSheet.create({
  button: {
    borderColor: PRIMARY,
    borderWidth: 1,
    color: 'black',
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.5,
    elevation: 3,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 10 }
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3
  },
  labelStyle: {}
});

interface Props {
  children: any;
  icon?: any;
  style: any;
  containerStyle?: any;
  labelStyle?: any;
  onPress: any;
  loading?: boolean;
}

const GHDButton = ({
  children,
  icon = null,
  style = {},
  containerStyle = {},
  labelStyle = {},
  onPress,
  loading
}: Props) => {
  const buttonLabelStyle = Array.isArray(labelStyle)
    ? labelStyle
    : [labelStyle];
  const buttonLabelMergedStyle = [classes.labelStyle, ...buttonLabelStyle];
  const externalStyleArray = Array.isArray(style) ? style : [style];
  const buttonStyles = [classes.button, ...externalStyleArray];
  const containerExternalStyleArray = Array.isArray(containerStyle)
    ? containerStyle
    : [containerStyle];
  const contentStyle = [
    classes.buttonContainer,
    ...containerExternalStyleArray
  ];

  return (
    <Button
      icon={icon}
      contentStyle={contentStyle}
      mode="outlined"
      theme={{ roundness: 10, colors: { primary: 'black' } }}
      style={buttonStyles}
      labelStyle={buttonLabelMergedStyle}
      onPress={onPress}
      loading={loading}
    >
      {children}
    </Button>
  );
};

export default GHDButton;
