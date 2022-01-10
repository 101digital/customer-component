import { SearchIcon } from '../../../assets';
import { Formik } from 'formik';
import { debounce } from 'lodash';
import React, { forwardRef, useCallback, useContext, useImperativeHandle, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { SearchBoxProps, SearchBoxStyles } from './types';
import { SearchData } from './model';
import useMergeStyles from './theme';
import { ThemeContext } from 'react-native-theme-component';

export type SearchBoxComponentRefs = {
  clearSearch: () => void;
};

const SearchBoxComponent = forwardRef((props: SearchBoxProps, ref) => {
  const { onSearch, style, searchIcon, placeholderColor } = props;
  const formikRef: any = useRef(null);
  const styles: SearchBoxStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  useImperativeHandle(
    ref,
    (): SearchBoxComponentRefs => ({
      clearSearch,
    })
  );

  const clearSearch = () => {
    onSearch('');
    formikRef?.current?.setFieldValue('key', '');
  };

  const _onSearch = useCallback(
    debounce(function (k) {
      onSearch(k);
    }, 300),
    []
  );

  return (
    <View style={styles.containerStyle}>
      <Formik innerRef={formikRef} initialValues={SearchData.empty()} onSubmit={() => {}}>
        {({ setFieldValue, values }) => (
          <View style={styles.contentContainerStyle}>
            <View style={styles.searchIconContainerStyle}>
              {searchIcon ?? <SearchIcon size={15} color={'#9B9BC5'} />}
            </View>
            <TextInput
              style={styles.inputTextStyle}
              value={values.key}
              onChangeText={(text) => {
                setFieldValue('key', text);
                _onSearch(text);
              }}
              placeholder={i18n?.t('customer_component.plh_search') ?? 'Search'}
              placeholderTextColor={placeholderColor ?? '#8b8b8b'}
              textAlignVertical='center'
            />
          </View>
        )}
      </Formik>
    </View>
  );
});

export default SearchBoxComponent;
