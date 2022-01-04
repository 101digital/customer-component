# customer-component

Manage customer data

## Features

- Display all customers data and can search on it
- Display all customer's invoices
- Display customer's information details
- Add/Edit/Delete customer

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://github.com/101digital/customer-component.git
```

This component have some dependencies packages, please make sure you installed them before using this component

- [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)
- [react-native-permissions](https://github.com/zoontek/react-native-permissions)
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
- [react-native-device-info](https://github.com/react-native-device-info/react-native-device-info)
- [react-native-contacts](https://github.com/morenoh149/react-native-contacts)

If have any issue while installing, can see [Issue While Installing Sub-Component](https://github.com/101digital/react-native-banking-components/blob/master/README.md)

## Quick Start

### Init API Service

- `CustomerService` is initiated should be from `App.ts`

```javascript
import { CustomerService } from 'customer-component';

CustomerService.instance().initClients({
  customerClient: createAuthorizedApiClient(customerBaseUrl),
  invoiceClient: createAuthorizedApiClient(invoiceBaseUrl, true),
});
```

### Init Component Provider

- Wrapped the app with `CustomerProvider`

```javascript
import { CustomerProvider } from 'customer-component';

const App = () => {
  return (
    <View>
      <CustomerProvider>{/* YOUR APP COMPONENTS */}</CustomerProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props into each component

- In order to do multiple languages, you need to configurate `i18n` for [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git). And then, you have to copy and paste all fields and values in [texts](src/customer-component-data.json) into your app locale file. You can also change text value, but DON'T change the key.
