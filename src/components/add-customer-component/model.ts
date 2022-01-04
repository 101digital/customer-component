import * as Yup from 'yup';

export class CustomerData {
  constructor(
    readonly customerType: number,
    readonly name: string,
    readonly mobileNumber: string,
    readonly companyAddressLine1: string,
    readonly companyAddressLine2: string,
    readonly city: string,
    readonly country: string,
    readonly countryCode: string,
    readonly emailAddress: string,
    readonly postcode: string,
    readonly dueDatePeriod: string
  ) {}

  static init(
    customerType?: number,
    name?: string,
    mobileNumber?: string,
    companyAddressLine1?: string,
    companyAddressLine2?: string,
    city?: string,
    country?: string,
    countryCode?: string,
    emailAddress?: string,
    postcode?: string,
    dueDatePeriod?: string
  ): CustomerData {
    return new CustomerData(
      customerType ?? 0,
      name ?? '',
      mobileNumber ?? '',
      companyAddressLine1 ?? '',
      companyAddressLine2 ?? '',
      city ?? '',
      country ?? '',
      countryCode ?? '',
      emailAddress ?? '',
      postcode ?? '',
      dueDatePeriod ?? ''
    );
  }

  //   static default(contactData: any, originalCountries: any, defaultDueDays?: string): CustomerData {
  //     let country = '';
  //     let dueDatePeriod = '';
  //     if (contactData && contactData.addresses && contactData.addresses.length > 0) {
  //       const countryName = originalCountries.filter(
  //         (d: any) => d.attributes.code3 === contactData.addresses[0].countryCode
  //       );

  //       if (countryName.length > 0) {
  //         country = countryName[0].attributes.name;
  //       }
  //     }

  //     if (contactData && contactData.dueDatePeriod) {
  //       dueDatePeriod = contactData.dueDatePeriod.toString();
  //     } else if (defaultDueDays) {
  //       dueDatePeriod = defaultDueDays;
  //     }

  //     return new CustomerData(
  //       contactData
  //         ? contactData.name
  //           ? contactData.name
  //           : contactData.firstName
  //           ? contactData.firstName + ' ' + contactData.lastName
  //           : ''
  //         : '',
  //       contactData?.firstName || '',
  //       contactData?.lastName || '',
  //       contactData?.contact?.mobileNumber || '',
  //       contactData?.addresses[0]?.premise || '',
  //       contactData?.addresses[0]?.dependentLocality || '',
  //       contactData?.addresses[0]?.city || '',
  //       country,
  //       contactData?.contact?.email || '',
  //       contactData?.addresses[0]?.postcode || '',
  //       `${dueDatePeriod} ${i18n.t('company_detail.lbl_days')}`
  //     );
  //   }
}

export const CustomerSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('customer_component.val_enter_customer_name')
    .min(2, 'customer_component.val_invalid_customer_name'),
  mobileNumber: Yup.string()
    .trim()
    .min(6, 'customer_component.val_invalid_customer_mobile_number')
    .max(16, 'customer_component.val_invalid_customer_mobile_number2'),
  companyAddressLine1: Yup.string()
    .trim()
    .min(3, 'customer_component.val_invalid_customer_address1'),
  companyAddressLine2: Yup.string()
    .trim()
    .min(3, 'customer_component.val_invalid_customer_address2'),
  city: Yup.string().trim().min(2, 'customer_component.val_invalid_customer_city'),
  postcode: Yup.string().trim().min(3, 'customer_component.val_invalid_customer_postal'),
  emailAddress: Yup.string().trim().email('customer_component.val_invalid_customer_email'),
});
