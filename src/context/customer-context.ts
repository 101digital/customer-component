import {
  CreateCustomerParams,
  CustomerData,
  CustomerDetail,
  CustomerReference,
  CustomerSummary,
  FetchCustomerParam,
  CustomerInvoiceData,
  InvoiceParam,
} from './../types';
import { CustomerService } from './../services/customer-service';
import React, { useCallback, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { groupCustomerData, groupCustomerInvoice } from '../utils/helper';

const customerService = CustomerService.instance();

const initCustomerData: CustomerData = {
  data: [],
  groupedData: [],
};

const initInvoiceData: CustomerInvoiceData = {
  isLoading: false,
  isRefreshing: false,
  data: [],
  groupedData: [],
};

export interface CustomerContextData {
  customers: CustomerData;
  customerDetails?: CustomerDetail;
  isLoadingCustomers: boolean;
  isRefreshingCustomers: boolean;
  errorLoadCustomer?: Error;
  getCustomers: (params?: FetchCustomerParam) => void;
  refreshCustomers: (params?: FetchCustomerParam) => void;
  clearErrors: () => void;
  deleteCustomer: (customerId: string) => void;
  isDeletingCustomer: boolean;
  errorDeleteCustomer?: Error;
  isLoadingCustomerDetail: boolean;
  getCustomerDetails: (customerId: string) => void;
  errorLoadCustomerDetail?: Error;
  isDeleteSuccessful: boolean;
  clearCustomerDetail: () => void;
  isCreatingCustomer: boolean;
  createCustomer: (params: CreateCustomerParams) => Promise<CustomerReference | undefined>;
  errorCreateCustomer?: Error;
  isCreatedSuccessful: boolean;
  isUpdatingCustomer: boolean;
  updateCustomer: (
    customerId: string,
    params: CreateCustomerParams
  ) => Promise<CustomerReference | undefined>;
  errorUpdateCustomer?: Error;
  isUpdatedSuccessful: boolean;
  isLoadingSummary: boolean;
  getCustomerSummary: (customerId: string) => void;
  customerSummary?: CustomerSummary;
  errorLoadCustomerSummary?: Error;
  clearCustomerSummary: () => void;
  getCustomerInvoice: (params?: InvoiceParam) => void;
  refreshCustomerInvoice: (params?: InvoiceParam) => void;
  allInvoices: CustomerInvoiceData;
  clearCustomerInvoice: () => void;
}

export const customerDefaultValue: CustomerContextData = {
  customers: initCustomerData,
  isLoadingCustomers: false,
  isRefreshingCustomers: false,
  getCustomers: () => null,
  refreshCustomers: () => null,
  clearErrors: () => null,
  deleteCustomer: () => null,
  isDeletingCustomer: false,
  getCustomerDetails: () => null,
  isLoadingCustomerDetail: false,
  isDeleteSuccessful: false,
  clearCustomerDetail: () => null,
  isCreatingCustomer: false,
  createCustomer: async () => undefined,
  isCreatedSuccessful: false,
  isUpdatingCustomer: false,
  updateCustomer: async () => undefined,
  isUpdatedSuccessful: false,
  isLoadingSummary: false,
  getCustomerSummary: () => null,
  clearCustomerSummary: () => null,
  allInvoices: initInvoiceData,
  getCustomerInvoice: () => null,
  clearCustomerInvoice: () => null,
  refreshCustomerInvoice: () => null,
};

export const CustomerContext = React.createContext<CustomerContextData>(customerDefaultValue);

export function useCustomerContextValue(): CustomerContextData {
  const [_customers, setCustomers] = useState<CustomerData>(initCustomerData);
  const [_isLoadingCustomers, setLoadingCustomers] = useState(false);
  const [_isRefreshingCustomers, setRefreshingCustomer] = useState(false);
  const [_loadCustomersError, setLoadCustomerError] = useState<Error | undefined>();
  const [_isDeletingCustomer, setDeletingCustomer] = useState(false);
  const [_deleteCustomerError, setDeleteCustomerError] = useState<Error | undefined>();
  const [_isLoadingCustomerDetail, setLoadingCustomerDetail] = useState(false);
  const [_loadCustomerDetailError, setLoadCustomerDetailError] = useState<Error | undefined>();
  const [_customerDetail, setCustomerDetail] = useState<CustomerDetail | undefined>(undefined);
  const [_isDeletedSuccessful, setDeletedSuccessful] = useState(false);
  const [_isCreatingCustomer, setCreatingCustomer] = useState(false);
  const [_errorCreateCustomer, setErrorCreateCustomer] = useState<Error | undefined>();
  const [_isCreatedSuccessful, setCreatedSuccessful] = useState(false);
  const [_isUpdatingCustomer, setUpdatingCustomer] = useState(false);
  const [_errorUpdateCustomer, setErrorUpdateCustomer] = useState<Error | undefined>();
  const [_isUpdatedSuccessful, setUpdatedSuccessful] = useState(false);
  const [_isLoadingCustomerSummary, setLoadingCustomerSummary] = useState(false);
  const [_errorLoadCustomerSummary, setErrorLoadCustomerSummary] = useState<Error | undefined>();
  const [_customerSummary, setCustomerSummary] = useState<CustomerSummary | undefined>(undefined);
  const [_allInvoices, setAllInvoies] = useState<CustomerInvoiceData>(initInvoiceData);

  const getCustomers = useCallback(
    async (params?: FetchCustomerParam) => {
      try {
        setLoadingCustomers(true);
        const { data, paging } = await customerService.fetchCustomers(params);
        const _filteredData = data.filter((item: CustomerReference) => {
          if (item.name || !isEmpty(item.firstName)) {
            return item;
          }
        });
        if (paging.pageNumber === 1) {
          setCustomers({
            data: _filteredData,
            paging,
            groupedData: groupCustomerData(_filteredData),
          });
        } else {
          setCustomers({
            data: [..._customers.data, ..._filteredData],
            paging,
            groupedData: groupCustomerData([..._customers.data, ..._filteredData]),
          });
        }
        setLoadingCustomers(false);
      } catch (err) {
        setLoadingCustomers(false);
        setLoadCustomerError(err as Error);
      }
    },
    [_customers]
  );

  const refreshCustomers = useCallback(
    async (params?: FetchCustomerParam) => {
      try {
        setLoadCustomerError(undefined);
        setRefreshingCustomer(true);
        const { data, paging } = await customerService.fetchCustomers({ ...params, pageNum: 1 });
        const _filteredData = data.filter((item: CustomerReference) => {
          if (item.name || !isEmpty(item.firstName)) {
            return item;
          }
        });
        setCustomers({
          data: _filteredData,
          paging,
          groupedData: groupCustomerData(_filteredData),
        });
        setRefreshingCustomer(false);
      } catch (err) {
        setRefreshingCustomer(false);
        setLoadCustomerError(err as Error);
      }
    },
    [_customers]
  );

  const clearErrors = useCallback(async () => {
    setLoadCustomerError(undefined);
    setDeleteCustomerError(undefined);
    setLoadCustomerDetailError(undefined);
    setErrorCreateCustomer(undefined);
    setErrorUpdateCustomer(undefined);
    setAllInvoies({
      ..._allInvoices,
      error: undefined,
    });
  }, []);

  const getCustomerDetails = useCallback(async (customerId: string) => {
    try {
      setLoadingCustomerDetail(true);
      const { data } = await customerService.fetchCustomerDetails(customerId);
      setCustomerDetail(data);
      setLoadingCustomerDetail(false);
    } catch (error) {
      setLoadingCustomerDetail(false);
      setLoadCustomerDetailError(error as Error);
    }
  }, []);

  const deleteCustomer = useCallback(
    async (customerId: string) => {
      try {
        setDeletingCustomer(true);
        await customerService.deleteCustomer(customerId);
        setDeletedSuccessful(true);
        setTimeout(() => {
          setDeletedSuccessful(false);
        }, 100);
        setDeletingCustomer(false);
        refreshCustomers();
      } catch (err) {
        setDeleteCustomerError(err as Error);
        setDeletingCustomer(false);
      }
    },
    [_customers]
  );

  const clearCustomerDetail = useCallback(() => {
    setCustomerDetail(undefined);
  }, []);

  const clearCustomerInvoice = useCallback(() => {
    setAllInvoies(initInvoiceData);
  }, []);

  const createCustomer = useCallback(async (params: CreateCustomerParams) => {
    try {
      setCreatingCustomer(true);
      const { data } = await customerService.addCustomer(params);
      setCreatedSuccessful(true);
      setTimeout(() => {
        setCreatedSuccessful(false);
      }, 100);
      setCreatingCustomer(false);
      refreshCustomers();
      return {
        ...data,
        customerName: params.name,
      };
    } catch (error) {
      setErrorCreateCustomer(error as Error);
      setCreatingCustomer(false);
    }
    return undefined;
  }, []);

  const updateCustomer = useCallback(async (customerId: string, params: CreateCustomerParams) => {
    try {
      setUpdatingCustomer(true);
      const { data } = await customerService.updateCustomer(customerId, params);
      setUpdatedSuccessful(true);
      setTimeout(() => {
        setUpdatedSuccessful(false);
      }, 100);
      setUpdatingCustomer(false);
      refreshCustomers();
      return {
        ...data,
        customerName: params.name,
      };
    } catch (error) {
      setErrorUpdateCustomer(error as Error);
      setUpdatingCustomer(false);
    }
    return undefined;
  }, []);

  const getCustomerSummary = useCallback(async (customerId: string) => {
    try {
      setLoadingCustomerSummary(true);
      const { data } = await customerService.fetchCustomerSummary(customerId);
      setCustomerSummary(data);
      setLoadingCustomerSummary(false);
    } catch (error) {
      setErrorLoadCustomerSummary(error as Error);
      setLoadingCustomerSummary(false);
    }
  }, []);

  const clearCustomerSummary = useCallback(async () => {
    setCustomerSummary(undefined);
  }, []);

  const getCustomerInvoice = useCallback(
    async (params?: InvoiceParam) => {
      try {
        switch (params?.status) {
          default:
            setAllInvoies({
              ..._allInvoices,
              isLoading: true,
            });
            break;
        }
        const { data, paging } = await customerService.getCustomerInvoices(params);
        let _invoices;
        if (paging.pageNumber === 1) {
          _invoices = data;
        } else {
          _invoices = [..._allInvoices.data, ...data];
        }
        switch (params?.status) {
          default:
            setAllInvoies({
              ..._allInvoices,
              data: _invoices,
              paging,
              groupedData: groupCustomerInvoice(_invoices),
              isLoading: false,
            });
            break;
        }
      } catch (error) {
        switch (params?.status) {
          default:
            setAllInvoies({
              ..._allInvoices,
              isLoading: false,
              error: error as Error,
            });
            break;
        }
      }
    },
    [_allInvoices]
  );

  const refreshCustomerInvoice = useCallback(
    async (params?: InvoiceParam) => {
      try {
        switch (params?.status) {
          default:
            setAllInvoies({
              ..._allInvoices,
              isRefreshing: true,
            });
            break;
        }
        const { data, paging } = await customerService.getCustomerInvoices(params);
        switch (params?.status) {
          default:
            setAllInvoies({
              ..._allInvoices,
              data,
              paging,
              groupedData: groupCustomerInvoice(data),
              isRefreshing: false,
            });
            break;
        }
      } catch (error) {
        switch (params?.status) {
          default:
            setAllInvoies({
              ..._allInvoices,
              isRefreshing: false,
              error: error as Error,
            });
            break;
        }
      }
    },
    [_allInvoices]
  );

  return useMemo(
    () => ({
      customers: _customers,
      isLoadingCustomers: _isLoadingCustomers,
      isRefreshingCustomers: _isRefreshingCustomers,
      errorLoadCustomer: _loadCustomersError,
      getCustomers,
      refreshCustomers,
      clearErrors,
      deleteCustomer,
      isDeletingCustomer: _isDeletingCustomer,
      errorDeleteCustomer: _deleteCustomerError,
      getCustomerDetails,
      customerDetails: _customerDetail,
      isLoadingCustomerDetail: _isLoadingCustomerDetail,
      errorLoadCustomerDetail: _loadCustomerDetailError,
      isDeleteSuccessful: _isDeletedSuccessful,
      clearCustomerDetail,
      isCreatingCustomer: _isCreatingCustomer,
      errorCreateCustomer: _errorCreateCustomer,
      createCustomer,
      isCreatedSuccessful: _isCreatedSuccessful,
      updateCustomer,
      isUpdatingCustomer: _isUpdatingCustomer,
      isUpdatedSuccessful: _isUpdatedSuccessful,
      errorUpdateCustomer: _errorUpdateCustomer,
      getCustomerSummary,
      isLoadingSummary: _isLoadingCustomerSummary,
      clearCustomerSummary,
      errorLoadCustomerSummary: _errorLoadCustomerSummary,
      customerSummary: _customerSummary,
      getCustomerInvoice,
      allInvoices: _allInvoices,
      clearCustomerInvoice,
      refreshCustomerInvoice,
    }),
    [
      _allInvoices,
      _customers,
      _isLoadingCustomers,
      _isRefreshingCustomers,
      _loadCustomersError,
      _isDeletingCustomer,
      _deleteCustomerError,
      _isLoadingCustomerDetail,
      _loadCustomerDetailError,
      _customerDetail,
      _isDeletedSuccessful,
      _isCreatingCustomer,
      _errorCreateCustomer,
      _isCreatedSuccessful,
      _isUpdatingCustomer,
      _isUpdatedSuccessful,
      _errorUpdateCustomer,
      _isLoadingCustomerSummary,
      _errorLoadCustomerSummary,
      _customerSummary,
    ]
  );
}
