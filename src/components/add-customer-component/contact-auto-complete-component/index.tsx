import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ContactAutoCompleteComponentProps, ContactAutoCompleteComponentStyles } from '../types';
import useMergeStyles from './theme';

const ContactAutoCompleteComponent = (props: ContactAutoCompleteComponentProps) => {
  const { style, position, contacts, onSelected } = props;
  const styles: ContactAutoCompleteComponentStyles = useMergeStyles(style);

  return (
    <View style={[styles.containerStyle, { top: position, left: 0, right: 0 }]}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {contacts.map((c, index) => {
          let fullName = `${c?.givenName?.toLowerCase() ?? ''} ${
            c?.familyName?.toLowerCase() ?? ''
          }`;
          let sanitizeName = fullName
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
          const phoneNumber = c.phoneNumbers[0]?.number;
          const email = c.emailAddresses[0]?.email;
          const _separatorColor = phoneNumber && email ? 'grey' : 'transparent';
          return (
            <TouchableOpacity
              onPress={() => {
                onSelected(sanitizeName, phoneNumber, email);
              }}
              activeOpacity={0.8}
              style={styles.itemContainerStyle}
              key={index}
            >
              <Text style={styles.itemContactNameStyle}>{sanitizeName}</Text>
              <Text style={styles.itemContactInfoStyle}>
                <Text>{phoneNumber ?? ''}</Text>
                <Text style={{ color: _separatorColor }}>{'  |  '}</Text>
                <Text>{email ?? ''}</Text>
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ContactAutoCompleteComponent;
