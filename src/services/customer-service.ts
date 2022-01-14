import { CreateCustomerParams, FetchCustomerParam, InvoiceParam } from '../types';

type CustomerClient = {
  customerClient: any;
  invoiceClient: any;
  defaultDueDate?: number;
};

export class CustomerService {
  private static _instance: CustomerService = new CustomerService();

  private _customerClient?: any;
  private _invoiceClient?: any;
  private _defaultDueDate = 15;

  constructor() {
    if (CustomerService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use CustomerService.getInstance() instead of new.'
      );
    }
    CustomerService._instance = this;
  }

  public static instance(): CustomerService {
    return CustomerService._instance;
  }

  public initClients = (clients: CustomerClient) => {
    this._customerClient = clients.customerClient;
    this._invoiceClient = clients.invoiceClient;
    this._defaultDueDate = clients.defaultDueDate ?? this._defaultDueDate;
  };

  public setDefaultDueDate = (dueDate?: number) => {
    this._defaultDueDate = dueDate ?? this._defaultDueDate;
  };

  public getDefaultDueDate = () => this._defaultDueDate;

  fetchCustomers = async (params?: FetchCustomerParam) => {
    if (this._customerClient) {
      const response = await this._customerClient.get('customers', {
        params: {
          ...params,
          pageNum: params?.pageNum || 1,
          pageSize: params?.pageSize || 15,
          listOrders: 'customerName-ASC',
        },
      });
      return response.data;
    } else {
      throw new Error('Customer Client is not registered');
    }
  };

  addCustomer = async (params: CreateCustomerParams) => {
    const body = {
      addresses: [
        {
          addressType: 'INVOICE',
          city: params.city,
          countryCode: params.countryCode,
          county: params.country,
          customFields: [],
          dependentLocality: params.companyAddressLine2,
          isDefault: false,
          override: false,
          postcode: params.postcode,
          premise: params.companyAddressLine1,
          thoroughfare: '',
        },
      ],
      contact: {
        email: params.emailAddress,
        mobileNumber: params.mobileNumber,
      },
      firstName: params.firstName,
      lastName: params.lastName,
      name: params.name,
      customerType: params.customerType,
      dueDatePeriod: params.dueDatePeriod ? parseInt(params.dueDatePeriod, 10) : null,
    };
    if (this._customerClient) {
      const response = await this._customerClient.post('customers', body, {
        headers: {
          'Operation-Mode': 'SYNC',
        },
      });
      return response.data;
    } else {
      throw new Error('Customer Client is not registered');
    }
  };

  updateCustomer = async (customerId: string, params: CreateCustomerParams) => {
    const body = {
      addresses: [
        {
          addressType: 'INVOICE',
          city: params.city,
          countryCode: params.countryCode,
          county: params.country,
          customFields: [],
          dependentLocality: params.companyAddressLine2,
          isDefault: false,
          override: false,
          postcode: params.postcode,
          premise: params.companyAddressLine1,
          thoroughfare: '',
        },
      ],
      contact: {
        email: params.emailAddress,
        mobileNumber: params.mobileNumber,
      },
      firstName: params.firstName,
      lastName: params.lastName,
      name: params.name,
      customerType: params.customerType,
      dueDatePeriod: params.dueDatePeriod ? parseInt(params.dueDatePeriod, 10) : null,
    };
    if (this._customerClient) {
      const response = await this._customerClient.put(`customers/${customerId}`, body, {
        headers: {
          'Operation-Mode': 'SYNC',
        },
      });
      return response.data;
    } else {
      throw new Error('Customer Client is not registered');
    }
  };

  fetchCustomerDetails = async (customerId: string) => {
    if (this._customerClient) {
      const response = await this._customerClient.get(`customers/${customerId}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return response.data;
    } else {
      throw new Error('Customer Client is not registered');
    }
  };

  fetchCustomerSummary = async (customerId: string) => {
    if (this._customerClient) {
      const response = await this._customerClient.get(`customers/${customerId}/summary`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return response.data;
    } else {
      throw new Error('Customer Client is not registered');
    }
  };

  deleteCustomer = async (customerId: string) => {
    if (this._customerClient) {
      const response = await this._customerClient.delete(`customers/${customerId}`);
      return response.data;
    } else {
      throw new Error('Customer Client is not registered');
    }
  };

  getCustomerInvoices = async (params?: InvoiceParam) => {
    if (this._invoiceClient) {
      const response = await this._invoiceClient.get('invoices', {
        params: {
          ...params,
          pageNum: params?.pageNum || 1,
          pageSize: params?.pageSize || 10,
          fromDate: params?.fromDate,
          toDate: params?.toDate,
          ordering: params?.ordering || 'DESCENDING',
          sortBy: params?.sortBy || 'CREATED_DATE',
          dateType: params?.dateType || 'INVOICE_DATE',
        },
      });
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };
}
