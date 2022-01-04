import useMergeStyles from './theme';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import { AddCustomerComponentProps, AddCustomerComponentStyles } from './types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, FormikProps } from 'formik';
import { CustomerData, CustomerSchema } from './model';
import CustomerTypeComponent from './customer-type-component';
import {
  Button,
  CountryPicker,
  InputField,
  showMessage,
  ThemeContext,
} from 'react-native-theme-component';
import { ArrowDownIcon } from '../../assets';
// Dependencies packages
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import PermissionWarningComponent from './permission-warning-component';
import ContactAutoCompleteComponent from './contact-auto-complete-component';
import { isEmpty } from 'lodash';
import Contacts from 'react-native-contacts';
import SelectDueDateComponent from './select-due-date-component';
import { PaymentTerm } from '../../types';
import { CustomerContext } from '../../context/customer-context';

const defaultPaymentTerms: PaymentTerm[] = [
  {
    id: 1,
    value: -1,
    isDefault: true,
  },
  {
    id: 2,
    value: 15,
  },
  {
    id: 3,
    value: 45,
  },
  {
    id: 4,
    value: 60,
  },
  {
    id: 5,
    value: 90,
  },
];

const AddCustomerComponent = (props: AddCustomerComponentProps) => {
  const {
    style,
    arrowDownIcon,
    activeBorderColor,
    customer,
    defaultDueDays,
    paymentTerms,
    onCreatedCustomer,
    onUpdatedCustomer,
    CustomerType,
    PermissionWarning,
    ContactAutoComplete,
    SelectDueDate,
  } = props;
  const formikRef: any = useRef(null);
  const styles: AddCustomerComponentStyles = useMergeStyles(style);
  const { colors, deviceCountryCode, countries, i18n } = useContext(ThemeContext);
  const [isShowCountryPicker, setShowCountryPicker] = useState(false);
  const [isShowDueDatePicker, setShowDueDatePicker] = useState(false);
  const [isShowPermission, setShowPermission] = useState<boolean>(false);
  const [contactsList, setContactsList] = useState<any>();
  const [filteredContactsList, setFilteredContactsList] = useState<any>();
  const [isShowContactPicker, setShowContactPicker] = useState(false);
  const [contactPosY, setContactPosY] = useState(0);
  const [dueDate, setDueDate] = useState<PaymentTerm | undefined>(undefined);
  const _paymentTerms = paymentTerms ?? defaultPaymentTerms;
  const {
    isCreatedSuccessful,
    createCustomer,
    isCreatingCustomer,
    getCustomerDetails,
    customerDetails,
    isUpdatedSuccessful,
    isUpdatingCustomer,
    updateCustomer,
    isLoadingCustomerDetail,
  } = useContext(CustomerContext);

  useEffect(() => {
    if (isCreatedSuccessful) {
      showMessage({
        message: i18n?.t(
          'customer_component.msg_added_successful' ?? 'Customer added successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [isCreatedSuccessful]);

  useEffect(() => {
    if (isUpdatedSuccessful) {
      showMessage({
        message: i18n?.t(
          'customer_component.msg_update_successful' ?? 'Customer updated successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [isUpdatedSuccessful]);

  useEffect(() => {
    if (!customer) {
      const defaultCountry = countries.find((c) => c.attributes.idd === deviceCountryCode);
      if (defaultCountry) {
        formikRef?.current?.setFieldValue('country', defaultCountry.attributes.name);
        formikRef?.current?.setFieldValue('countryCode', defaultCountry.attributes.code3);
      }
      setDueDate(_paymentTerms.find((p) => p.isDefault));
      formikRef?.current?.setFieldValue('dueDatePeriod', _getDefaultDueTitle);
    } else {
      getCustomerDetails(customer.id);
    }
  }, [deviceCountryCode, countries, customer]);

  useEffect(() => {
    initCustomerFields();
  }, [customerDetails]);

  const initCustomerFields = () => {
    if (customerDetails) {
      const customerName = !isEmpty(customerDetails.name)
        ? customerDetails.name
        : `${customerDetails?.firstName ?? ''} ${customerDetails?.lastName ?? ''}`.trim();
      formikRef?.current?.setFieldValue('name', customerDetails.name ?? customerName);
      formikRef?.current?.setFieldValue(
        'customerType',
        customerDetails.customerType === 'Individual' ? 0 : 1
      );
      formikRef?.current?.setFieldValue('mobileNumber', customerDetails.contact.mobileNumber);
      formikRef?.current?.setFieldValue('emailAddress', customerDetails.contact.email);
      if (customerDetails.dueDatePeriod) {
        formikRef?.current?.setFieldValue(
          'dueDatePeriod',
          (i18n?.t('customer_component.lbl_due_days') ?? '%s days').replace(
            '%s',
            customerDetails.dueDatePeriod ?? defaultDueDays
          )
        );
      } else {
        setDueDate(_paymentTerms.find((p) => p.isDefault));
        formikRef?.current?.setFieldValue('dueDatePeriod', _getDefaultDueTitle);
      }
      const addresss = !isEmpty(customerDetails.addresses)
        ? customerDetails.addresses[0]
        : undefined;
      if (addresss) {
        let country =
          countries.find((c) => c.attributes.code3 === addresss.countryCode) ??
          countries.find((c) => c.attributes.idd === deviceCountryCode);
        if (country) {
          formikRef?.current?.setFieldValue('country', country.attributes.name);
          formikRef?.current?.setFieldValue('countryCode', country.attributes.code3);
        }
        formikRef?.current?.setFieldValue('companyAddressLine1', addresss.premise);
        formikRef?.current?.setFieldValue('companyAddressLine2', addresss.dependentLocality);
        formikRef?.current?.setFieldValue('city', addresss.city);
        formikRef?.current?.setFieldValue('postcode', addresss.postcode);
      }
    }
  };

  useEffect(() => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_CONTACTS,
        default: PERMISSIONS.IOS.CONTACTS,
      })
    ).then((result) => {
      if (result === RESULTS.GRANTED) {
        getContactList();
      } else {
        if (!isShowPermission) {
          setShowPermission(true);
        }
      }
    });
  }, []);

  const _getDefaultDueTitle = (
    i18n?.t('customer_component.lbl_default_due_date') ?? 'Default (%s days)'
  ).replace('%s', defaultDueDays);

  const getContactList = () => {
    Contacts.getAll()
      .then((contacts) => {
        if (!isEmpty(contacts)) {
          setContactsList(contacts);
          setFilteredContactsList(contacts);
        }
      })
      .catch((e) => {
        if (__DEV__) {
          console.log('error ', e);
        }
      });
  };

  const checkPermisson = () => {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_CONTACTS,
        default: PERMISSIONS.IOS.CONTACTS,
      })
    ).then((result) => {
      if (result === RESULTS.GRANTED) {
        setShowPermission(false);
      } else {
        if (!isShowPermission) {
          setShowPermission(true);
        }
      }
    });
  };

  const toggleCountryPicker = () => setShowCountryPicker(!isShowCountryPicker);
  const toggleDueDatePicker = () => setShowDueDatePicker(!isShowDueDatePicker);

  const handleSubmit = async (values: CustomerData) => {
    if (customer) {
      const data = await updateCustomer(customer.id, {
        name: values.name,
        firstName: '',
        lastName: '',
        mobileNumber: values.mobileNumber,
        companyAddressLine1: values.companyAddressLine1,
        companyAddressLine2: values.companyAddressLine2,
        city: values.city,
        country: values.country,
        postcode: values.postcode,
        emailAddress: values.emailAddress,
        countryCode: values.countryCode,
        customerType: values.customerType === 0 ? 'Individual' : 'Business',
        dueDatePeriod: dueDate?.isDefault ? undefined : values.dueDatePeriod.replace(/[^0-9]/g, ''),
      });
      if (data) {
        onUpdatedCustomer(data);
      }
    } else {
      const data = await createCustomer({
        name: values.name,
        firstName: '',
        lastName: '',
        mobileNumber: values.mobileNumber,
        companyAddressLine1: values.companyAddressLine1,
        companyAddressLine2: values.companyAddressLine2,
        city: values.city,
        country: values.country,
        postcode: values.postcode,
        emailAddress: values.emailAddress,
        countryCode: values.countryCode,
        customerType: values.customerType === 0 ? 'Individual' : 'Business',
        dueDatePeriod: dueDate?.isDefault ? undefined : values.dueDatePeriod.replace(/[^0-9]/g, ''),
      });
      if (data) {
        onCreatedCustomer(data);
      }
    }
  };

  const searchContact = (key: string) => {
    if (isEmpty(contactsList)) {
      return [];
    } else {
      return contactsList.filter((e: any) => {
        let firstName = `${e?.givenName?.toLowerCase() ?? ''}`;
        let lastName = `${e?.familyName?.toLowerCase() ?? ''}`;
        let fullName = `${e?.givenName?.toLowerCase() ?? ''} ${e?.familyName?.toLowerCase() ?? ''}`;
        if (
          firstName.startsWith(key.toLowerCase()) ||
          lastName.startsWith(key.toLowerCase()) ||
          fullName.startsWith(key.toLowerCase())
        ) {
          return e;
        }
      });
    }
  };

  const renderForm = (formProps: FormikProps<CustomerData>) => {
    return (
      <>
        <Text style={styles.labelTextStyle}>Customer type</Text>
        <CustomerTypeComponent
          type={formProps.values.customerType}
          onChangedValue={(type) => {
            formProps.setFieldValue('customerType', type);
          }}
          style={CustomerType?.style}
          {...CustomerType?.props}
        />

        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_customer_name') ?? 'Name'}
        </Text>
        <InputField
          name='name'
          activeBorderColor={activeBorderColor ?? '#FOF3F8'}
          placeholder={i18n?.t('customer_component.plh_enter_name') ?? 'Enter name'}
          onFocus={checkPermisson}
          formatError={(e) => i18n?.t(e)}
          onChangeText={(text: string) => {
            formProps.setFieldValue('name', text);
            const searchText = text.trim();
            if (searchText.length === 0) {
              setShowContactPicker(false);
            } else {
              setShowContactPicker(true);
              const filterdContact = searchContact(searchText);
              setFilteredContactsList(filterdContact);
            }
          }}
          textAlignVertical='center'
          onSubmitEditing={() => {
            Keyboard.dismiss();
            setShowContactPicker(false);
          }}
        />
        <View
          onLayout={(event) => {
            if (contactPosY === 0) {
              const layout = event.nativeEvent.layout;
              setContactPosY(layout?.y + layout.height);
            }
          }}
        />
        {isShowContactPicker && (
          <ContactAutoCompleteComponent
            position={contactPosY}
            contacts={filteredContactsList}
            onSelected={(name, phoneNumber, email) => {
              Keyboard.dismiss();
              formProps.setFieldValue('name', name);
              formProps.setFieldValue('mobileNumber', phoneNumber ?? '');
              formProps.setFieldValue('emailAddress', email ?? '');
              setTimeout(() => {
                formProps.validateForm();
              }, 0);

              setShowContactPicker(false);
            }}
            style={ContactAutoComplete?.style}
          />
        )}
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_customer_phone_number') ?? 'Phone number'}
        </Text>
        <InputField
          name='mobileNumber'
          keyboardType={'number-pad'}
          activeBorderColor={activeBorderColor ?? '#FOF3F8'}
          placeholder={i18n?.t('customer_component.plh_enter_phone_number') ?? 'Enter phone number'}
          formatError={(e) => i18n?.t(e)}
          textAlignVertical='center'
        />
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_customer_email_id') ?? 'Email ID (Optional)'}
        </Text>
        <InputField
          name='emailAddress'
          keyboardType={'email-address'}
          activeBorderColor={activeBorderColor ?? '#FOF3F8'}
          placeholder={i18n?.t('customer_component.plh_enter_email_id') ?? 'Enter email ID'}
          formatError={(e) => i18n?.t(e)}
          textAlignVertical='center'
          autoCapitalize='none'
        />
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_address_line_1') ?? 'Address line 1 (Optional)'}
        </Text>
        <InputField
          name='companyAddressLine1'
          activeBorderColor={activeBorderColor ?? '#FOF3F8'}
          placeholder={
            i18n?.t('customer_component.plh_enter_address_line_1') ?? 'Enter address line 1'
          }
          formatError={(e) => i18n?.t(e)}
          textAlignVertical='center'
        />
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_address_line_2') ?? 'Address line 2 (Optional)'}
        </Text>
        <InputField
          name='companyAddressLine2'
          activeBorderColor={activeBorderColor ?? '#FOF3F8'}
          placeholder={
            i18n?.t('customer_component.plh_enter_address_line_2') ?? 'Enter address line 2'
          }
          formatError={(e) => i18n?.t(e)}
          textAlignVertical='center'
        />
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_city_name') ?? 'City name (Optional)'}
        </Text>
        <InputField
          name='city'
          activeBorderColor={activeBorderColor ?? '#FOF3F8'}
          placeholder={i18n?.t('customer_component.plh_enter_city_name') ?? 'Enter city name'}
          textAlignVertical='center'
          formatError={(e) => i18n?.t(e)}
        />
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_country') ?? 'Country (Optional)'}
        </Text>
        <TouchableOpacity activeOpacity={1} onPress={toggleCountryPicker}>
          <InputField
            name='country'
            activeBorderColor={activeBorderColor ?? '#FOF3F8'}
            editable={false}
            placeholder={i18n?.t('customer_component.plh_select_country') ?? 'Select country'}
            textAlignVertical='center'
            suffixIcon={
              <View style={styles.suffixIconStyle}>
                {arrowDownIcon ?? <ArrowDownIcon size={15} color={colors.primaryColor} />}
              </View>
            }
            pointerEvents='none'
          />
        </TouchableOpacity>
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_postalcode') ?? 'Postal code (Optional)'}
        </Text>
        <InputField
          name='postcode'
          activeBorderColor={activeBorderColor ?? '#FOF3F8'}
          placeholder={i18n?.t('customer_component.plh_enter_postalcode') ?? 'Enter postal code'}
          textAlignVertical='center'
          formatError={(e) => i18n?.t(e)}
        />
        <Text style={styles.labelTextStyle}>
          {i18n?.t('customer_component.lbl_invoice_due_date') ?? 'Invoice due after'}
        </Text>
        <TouchableOpacity activeOpacity={1} onPress={toggleDueDatePicker}>
          <InputField
            name='dueDatePeriod'
            activeBorderColor={activeBorderColor ?? '#FOF3F8'}
            editable={false}
            textAlignVertical='center'
            suffixIcon={
              <View style={styles.suffixIconStyle}>
                {arrowDownIcon ?? <ArrowDownIcon size={15} color={colors.primaryColor} />}
              </View>
            }
            pointerEvents='none'
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <View style={styles.containerStyle}>
        {isShowPermission && <PermissionWarningComponent {...PermissionWarning} />}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          style={styles.contentContainerStyle}
        >
          <Formik
            innerRef={formikRef}
            initialValues={CustomerData.init()}
            validationSchema={CustomerSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {renderForm}
          </Formik>
        </KeyboardAwareScrollView>
        <View style={styles.footerContainerStyle}>
          <Button
            disabled={isLoadingCustomerDetail}
            indicatorColor={colors.primaryColor}
            label={
              customer
                ? i18n?.t('customer_component.btn_update_customer') ?? 'Update customer'
                : i18n?.t('customer_component.btn_add_customer') ?? 'Add customer'
            }
            isLoading={isCreatingCustomer || isUpdatingCustomer}
            onPress={() => formikRef?.current?.submitForm()}
            style={
              style?.buttonStyle ?? {
                primaryContainerStyle: {
                  marginHorizontal: 15,
                },
              }
            }
          />
        </View>
      </View>
      <CountryPicker
        isVisible={isShowCountryPicker}
        onClose={toggleCountryPicker}
        onSelectedCountry={(_, name, code3) => {
          formikRef?.current?.setFieldValue('country', name);
          formikRef?.current?.setFieldValue('countryCode', code3);
          toggleCountryPicker();
        }}
      />
      <SelectDueDateComponent
        terms={_paymentTerms}
        defaultDueDays={defaultDueDays}
        isVisible={isShowDueDatePicker}
        onClose={toggleDueDatePicker}
        value={dueDate}
        onChangedValue={(value) => {
          toggleDueDatePicker();
          if (value) {
            setDueDate(value);
            if (value.isDefault) {
              formikRef?.current?.setFieldValue('dueDatePeriod', _getDefaultDueTitle);
            } else {
              formikRef?.current?.setFieldValue(
                'dueDatePeriod',
                (i18n?.t('customer_component.lbl_due_days') ?? '%s days').replace('%s', value.value)
              );
            }
          }
        }}
        style={SelectDueDate?.style}
        {...SelectDueDate?.props}
      />
    </>
  );
};

export default AddCustomerComponent;
