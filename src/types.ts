export interface FetchCustomerParam {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
}

export interface CustomerData {
  data: CustomerReference[];
  paging?: Paging;
  groupedData: any[];
}

export interface CustomerInvoiceData {
  isLoading: boolean;
  isRefreshing: boolean;
  data: Invoice[];
  paging?: Paging;
  groupedData: any[];
  error?: Error;
}

export interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  chargeDate: string;
  status: InvoiceStatus[];
  numberOfDocuments?: number;
  description: string;
  totalAmount: number;
  customer?: Customer;
  subStatus?: InvoiceSubStatus[];
}

export interface InvoiceStatus {
  key: InvoiceStatusType;
  value: string;
}

export interface InvoiceSubStatus {
  key: InvoiceSubStatusType;
  value: boolean;
}

export interface CustomerDetail {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  contact: {
    email: string;
    mobileNumber: string;
  };
  dueDatePeriod?: number;
  customerType: string;
  addresses: CustomerAddress[];
}

export interface CustomerAddress {
  addressType: string;
  city: string;
  countryCode: string;
  dependentLocality: string;
  isDefault: boolean;
  override: boolean;
  postcode: string;
  premise: string;
  thoroughfare: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  contact: {
    email: string;
    mobileNumber: string;
  };
}

export interface CustomerReference {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  contact: ContactReference;
  customerName: string;
  avator?: string;
  colorCode?: string;
  dueDatePeriod?: number;
}

export interface ContactReference {
  id?: string;
  email?: string;
  mobileNumber?: string;
}

export interface Paging {
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
}

export interface PaymentTerm {
  id: number;
  value: number;
  isDefault?: boolean;
}

export interface CreateCustomerParams {
  name: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  companyAddressLine1: string;
  companyAddressLine2: string;
  city: string;
  country: string;
  postcode: string;
  emailAddress: string;
  countryCode: string;
  customerType?: string;
  dueDatePeriod?: string;
}

export interface CustomerSummary {
  totalPaidAmount: number;
  invoiceTotalDue: number;
  invoiceTotalOverDue: number;
  numberOfDue: number;
  numberOfOverDue: number;
  numberOfPaid: number;
}

export interface InvoiceParam {
  pageNum?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  fromTotalAmount?: number;
  toTotalAmount?: number;
  status?: InvoiceStatusType;
  keyword?: string;
  dateType?: InvoiceDateType;
  sortBy?: InvoiceSortType;
  ordering?: OrderingType;
  customerId?: string;
}

export enum InvoiceStatusType {
  paid = 'Paid',
  due = 'Due',
  overDue = 'Overdue',
  search = 'Search',
  all = 'All',
}

export enum InvoiceSubStatusType {
  sent = 'Sent',
  chased = 'Chased',
  viewed = 'Viewed',
}

export enum InvoiceDateType {
  invoiceDate = 'INVOICE_DATE',
  dueDate = 'DUE_DATE',
}

export enum InvoiceSortType {
  invoiceDate = 'INVOICE_DATE',
  status = 'STATUS',
  totalAmount = 'TOTAL_AMOUNT',
  dueAmount = 'DUE_AMOUNT',
  dueDate = 'DUE_DATE',
}

export enum OrderingType {
  descending = 'DESCENDING',
  ascending = 'ASCENDING',
}
