import React, { ReactNode } from 'react';
import { CustomerContext, useCustomerContextValue } from './customer-context';

export type CustomerProviderProps = {
  children: ReactNode;
};

const CustomerProvider = (props: CustomerProviderProps) => {
  const { children } = props;
  const cutsomerContextData = useCustomerContextValue();

  return (
    <CustomerContext.Provider value={cutsomerContextData}>{children}</CustomerContext.Provider>
  );
};

export default CustomerProvider;
