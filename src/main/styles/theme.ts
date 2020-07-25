import { DefaultTheme, Theme, configureFonts } from 'react-native-paper';
import { PRIMARY } from './colors';

const fontConfig = {
  // default: {
  //   regular: {
  //     fontFamily: 'lato-regular'
  //   },
  //   medium: {
  //     fontFamily: 'lato-bold'
  //   },
  //   light: {
  //     fontFamily: 'lato-light'
  //   },
  //   thin: {
  //     fontFamily: 'lato-thin'
  //   }
  // }
};

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 0,
  mode: 'adaptive',
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY,
    backdrop: 'red'
  },
  fonts: configureFonts(fontConfig)
};

export default theme;
