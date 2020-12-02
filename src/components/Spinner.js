/**
 * A basic activity indicator that takes all available space
 */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import colours from '../colours';

const containerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const Spinner = ({ small }) => (
  <View style={containerStyle}>
    <ActivityIndicator size={small ? 'small' : 'large'} color={colours.blue} />
  </View>
);

export default Spinner;
