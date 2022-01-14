import { CheckIcon } from '../../../assets';
import { Formik } from 'formik';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet, InputField, ThemeContext } from 'react-native-theme-component';
import { SelectDueDateComponentProps, SelectDueDateComponentStyles } from './types';
import { CustomDueDateData, CustomDueDateSchema } from './model';
import useMergeStyles from './theme';
import { isEmpty } from 'lodash';
import { useKeyboard } from '../../../utils/keyboard';

const SelectDueDateComponent = (props: SelectDueDateComponentProps) => {
  const {
    style,
    isVisible,
    onClose,
    terms,
    defaultDueDays,
    activeBackgroundColor,
    inActiveBackgroundColor,
    activeTextColor,
    inActiveTextColor,
    value,
    onChangedValue,
  } = props;
  const styles: SelectDueDateComponentStyles = useMergeStyles(style);
  const formikRef: any = useRef(null);
  const { i18n, colors } = useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeField, setActiveField] = useState(false);
  const [padding, setPadding] = useState(0);
  const _activeBackgroundColor = activeBackgroundColor ?? colors.primaryButtonColor;
  const _inActiveBackgroundColor = inActiveBackgroundColor ?? colors.secondaryButtonColor;
  const _activeTextColor = activeTextColor ?? colors.primaryButtonLabelColor;
  const _inActiveTextColor = inActiveTextColor ?? colors.secondaryButtonLabelColor;
  const _keyboardHeights = useKeyboard();

  useEffect(() => {
    if (!isEmpty(_keyboardHeights) && Platform.OS === 'android') {
      setPadding(_keyboardHeights[0]);
    }
  }, [_keyboardHeights]);

  useEffect(() => {
    if (value) {
      const _termIndex = terms.findIndex((t) => t.id === value.id);
      if (_termIndex === -1) {
        if (value) {
          formikRef?.current?.setFieldValue('dueDate', value.value.toString());
        }
        setSelectedIndex(-1);
      } else {
        setSelectedIndex(_termIndex);
      }
    }
    return () => {
      setActiveField(false);
    };
  }, [value, isVisible]);

  const closeModal = () => {
    if (selectedIndex !== -1 || !activeField) {
      onClose();
    }
  };

  return (
    <BottomSheet
      avoidKeyboard
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={styles.containerStyle}>
        <Text style={styles.headerTitleStyle}>
          {i18n?.t('customer_component.lbl_invoice_due_date') ?? 'Invoice due after'}
        </Text>
        {terms.map((term, index) => {
          const _isSelected = selectedIndex === index;
          const _title = term.isDefault
            ? (i18n?.t('customer_component.lbl_default_due_date') ?? 'Default (%s days)').replace(
                '%s',
                defaultDueDays
              )
            : (i18n?.t('customer_component.lbl_due_days') ?? '%s days').replace('%s', term.value);
          return (
            <TouchableOpacity
              key={index.toString()}
              activeOpacity={0.1}
              style={[
                styles.itemContainerStyle,
                {
                  backgroundColor: _isSelected ? _activeBackgroundColor : _inActiveBackgroundColor,
                },
              ]}
              onPress={() => onChangedValue(term)}
            >
              <Text
                style={[
                  styles.itemTextStyle,
                  { color: _isSelected ? _activeTextColor : _inActiveTextColor },
                ]}
              >
                {_title}
              </Text>
              {_isSelected && (
                <View style={styles.suffixContainerStyle}>
                  <CheckIcon color={_activeTextColor} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
        <Formik
          innerRef={formikRef}
          initialValues={CustomDueDateData.initial()}
          validationSchema={CustomDueDateSchema}
          onSubmit={() => {}}
        >
          {({ values }) => {
            const _isSelected = selectedIndex === -1;
            return (
              <InputField
                name='dueDate'
                placeholder={
                  _isSelected ? '' : i18n?.t('customer_component.plh_custom') ?? 'Custom'
                }
                returnKeyType={'done'}
                autoFocus={false}
                formatError={(e) => i18n?.t(e) ?? 'Please enter invoice due after'}
                placeholderTextColor={_isSelected ? _activeTextColor : _inActiveTextColor}
                selectionColor={'#fff'}
                style={{
                  contentContainerStyle: [
                    styles.itemContainerStyle,
                    {
                      backgroundColor: _isSelected
                        ? _activeBackgroundColor
                        : _inActiveBackgroundColor,
                    },
                  ],
                  textInputStyle: [
                    styles.itemTextStyle,
                    { color: _isSelected ? _activeTextColor : _inActiveTextColor },
                  ],
                }}
                textAlign='center'
                textAlignVertical='center'
                onFocus={() => {
                  setActiveField(true);
                  setSelectedIndex(-1);
                }}
                onSubmitEditing={() => {
                  if (!isEmpty(values.dueDate)) {
                    onChangedValue({
                      id: -1001,
                      value: parseInt(values.dueDate, 10),
                    });
                    return true;
                  }
                }}
                keyboardType={'number-pad'}
                suffixIcon={
                  _isSelected && (
                    <View style={styles.suffixContainerStyle}>
                      <CheckIcon color={_activeTextColor} />
                    </View>
                  )
                }
              />
            );
          }}
        </Formik>
      </View>
      <View style={{ height: padding }} />
    </BottomSheet>
  );
};

export default SelectDueDateComponent;
