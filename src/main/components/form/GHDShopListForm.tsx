import { Formik } from 'formik';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';

import {PRIMARY} from '../../styles/colors';
import GHDButton from '../GHDButton';
import DropdownInputFormikValidator from './DropdownInputFormikValidator';
import InputFormikValidator from './InputFormikValidator';


const styles = StyleSheet.create({
  button: {
    borderColor: PRIMARY,
    borderWidth: 2
  },
  buttons: {
    paddingTop: 10,
    paddingBottom: 5
  }
});

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Nombre')
    .required(),
  storeId: yup
      .number()
      .label('Tienda')
      .typeError('Este campo es obligatorio')
      .required()
});

const formatForDropdown = items => {
  return items.map(item => ({
    value: item.id,
    label: item.name
  }));
};

interface Props {
  action?: any;
  initialValues?: any;
  readOnly?: boolean;
  submitLabel?: string;
  stores?: any[]
}

const GHDShopListForm = ({
  submitLabel,
  action,
  initialValues,
  readOnly = false,
  stores
}: Props) => {
  const [storesDropdown, setStoresDropdown] = useState([]);

  useEffect(() => {
    if (stores) {
      setStoresDropdown(formatForDropdown(stores));
    }
  }, [stores]);

  const onSubmit = (values, actions) => {
    const variables = {
      name: values.name,
      storeId: +values.storeId
    };

    action({ variables });
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <>
          <InputFormikValidator
            label="Nombre"
            formikProps={formikProps}
            formikKey="name"
            placeholder="Nombre"
            disabled={readOnly}
          />

          <DropdownInputFormikValidator
            items={storesDropdown}
            label="Tiendas"
            formikProps={formikProps}
            formikKey="storeId"
            placeholder="Tienda"
            disabled={readOnly}
          />
          <View style={styles.buttons}>
            <GHDButton
              style={[styles.button, styles.button]}
              loading={formikProps.isSubmitting}
              onPress={formikProps.handleSubmit as any}
            >
              {submitLabel}
            </GHDButton>
          </View>
        </>
      )}
    </Formik>
  );
};

export default GHDShopListForm;
