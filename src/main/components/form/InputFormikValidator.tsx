import React from 'react';
import { StyleSheet, View, KeyboardTypeOptions } from 'react-native';
import { HelperText, IconButton, TextInput } from 'react-native-paper';

export const GRAY_MEDIUM = '#A7A7A7';

interface Props {
  label?: string;
  formikProps?: any;
  formikKey?: any;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  inputProps?: any;
  icon?: any;
  style?: any;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  },
  inputField: {
    borderColor: 'black',
    paddingTop: 0.25,
    paddingBottom: 0.25,
    borderRadius: 0,
    backgroundColor: 'white',
    height: 35,
    fontSize: 20,
    fontFamily: 'lato-regular'
  },
  icon: {
    position: 'absolute',
    zIndex: 10,
    right: 5,
    top: 15
  }
});

const iconStyle = [styles.icon];

const InputFormikValidator = ({
  formikProps,
  formikKey,
  disabled,
  icon,
  placeholder,
  keyboardType = 'default',
  style = {}
}: Props) => {
  const hasError =
    !!formikProps.touched[formikKey] && formikProps.errors[formikKey];

  let value = `${formikProps.values[formikKey]}`;
  if (value === 'undefined' || value === 'null') {
    value = '';
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType={keyboardType}
        mode="outlined"
        style={{
          ...styles.inputField,
          ...style
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        error={hasError}
        disabled={disabled}
      />
      {icon && (
        <IconButton
          icon={icon}
          style={iconStyle}
          aria-label="icon"
          size={20}
          color={GRAY_MEDIUM}
          disabled={disabled}
        />
      )}
      {hasError && (
        <HelperText type="error">{formikProps.errors[formikKey]}</HelperText>
      )}
    </View>
  );
};

export default InputFormikValidator;
