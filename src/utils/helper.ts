import { values, isEmpty, chain } from 'lodash';
import moment from 'moment';
import { NativeScrollEvent } from 'react-native';
import { CustomerReference, Invoice } from '../types';

function rgbToHex(color: string) {
  const a = color.replace(/[^\d,]/g, '').split(',');
  return '#' + ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1);
}

export const addAlpha = (color: string, opacity: number) => {
  if (!color.startsWith('#')) {
    color = rgbToHex(color);
  }
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16)?.toUpperCase();
};

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 40;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const _stringToHslColor = (str: string, s: number, l: number) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const groupCustomerData = (customers: CustomerReference[]) => {
  const groupedData = customers
    .map((cus) => ({
      ...cus,
      customerName: cus?.name?.trim() ?? `${cus?.firstName ?? ''} ${cus?.lastName ?? ''}`?.trim(),
    }))
    .sort((a: CustomerReference, b: CustomerReference) => {
      return a.customerName.localeCompare(b.customerName, 'es', { sensitivity: 'base' });
    })
    .reduce((r: any, c: CustomerReference) => {
      let title = c.customerName[0].toUpperCase();
      let names = c.customerName.split(' ');
      let avator = names[0].substring(0, 1)?.toUpperCase();
      if (names.length > 1) {
        avator = avator + '' + names[1].substring(0, 1)?.toUpperCase();
      }
      c.avator = avator;
      c.colorCode = _stringToHslColor(c.id, 100, 80);
      if (!r[title]) {
        r[title] = { title, data: [c] };
      } else {
        r[title].data.push(c);
      }
      return r;
    }, {});
  return values(groupedData);
};

export const groupCustomerInvoice = (invoices: Invoice[]): any[] => {
  if (!isEmpty(invoices)) {
    const groupedData = chain(invoices)
      .groupBy((item) => {
        return moment(item.invoiceDate).format('YYYY-MM');
      })
      .map((value, key) => ({ date: key, data: value }))
      .orderBy((item) => item.date, ['desc'])
      .value();
    return groupedData;
  } else {
    return [];
  }
};
