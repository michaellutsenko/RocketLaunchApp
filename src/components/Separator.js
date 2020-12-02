// Simple separator
// Renders an empty view of a fixed height between launch cards in the list
import React from 'react';
import { View } from 'react-native';

const separatorStyle = {
  height: 15,
};

const Separator = () => <View style={separatorStyle} />;

export default Separator;
