import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DefaultTheme, HelperText, Menu, TextInput } from 'react-native-paper';

const borderColor = '#A7A7A7';
const textColor = DefaultTheme.colors.text;

const styles = StyleSheet.create({
  border: {
    borderColor,
    borderWidth: 2
  },
  container: {
    width: '100%',
    marginTop: 8,
    marginBottom: 4,
    color: textColor
  },
  contentStyleInputField: {},
  inputText: {},
  inputField: {
    borderColor: 'black',
    height: 35,
    backgroundColor: 'white'
  },
  inputFieldError: {
    borderWidth: 1,
    borderColor: 'red'
  },
  menu: {},
  menuItem: {}
});

interface Props {
  items?: any;
  label?: string;
  formikProps?: any;
  formikKey?: any;
  disabled?: boolean;
  placeholder?: string;
  keyboardType?: string;
}

const DropdownInputFormikValidator = ({
  items,
  label,
  formikProps,
  formikKey,
  disabled
}: Props) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    formikProps.values[formikKey] || ''
  );

  const hasError =
    !!formikProps.touched[formikKey] && formikProps.errors[formikKey];

  const openMenu = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const closeMenu = () => setOpen(false);

  const findLabel = (value: any) => {
    if (value) {
      const findedItem = items.find(
        (item: { value: any }) => item.value === value
      );
      if (findedItem) {
        return findedItem.label;
      }
    }
    return '';
  };

  const selectItem = (value: { value: any }) => {
    formikProps.setFieldValue(formikKey, value.value);
    setInputValue(value.value);
    closeMenu();
  };

  const myInputLabel = findLabel(inputValue);

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Menu
          visible={open}
          onDismiss={closeMenu}
          contentStyle={styles.menu}
          anchor={
            <TouchableWithoutFeedback onPress={openMenu}>
              <View pointerEvents="none">
                <TextInput
                  mode="outlined"
                  style={styles.inputField}
                  placeholder={label}
                  value={myInputLabel}
                  error={hasError}
                  disabled={disabled}
                  onFocus={openMenu}
                />
              </View>
            </TouchableWithoutFeedback>
          }
        >
          {items.map(
            (item: { value: React.ReactText; label: React.ReactNode }, index: number) => (
              <Menu.Item
                key={`dropdown-${index}`}
                style={styles.menuItem}
                onPress={() => {
                  selectItem(item);
                }}
                title={item.label}
              />
            )
          )}
        </Menu>
      </View>

      {hasError && (
        <HelperText type="error">{formikProps.errors[formikKey]}</HelperText>
      )}
    </View>
  );
};

export default DropdownInputFormikValidator;
