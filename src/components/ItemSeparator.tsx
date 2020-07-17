import React from 'react';
import {Box} from 'react-native-design-utility';
import {StyleSheet} from 'react-native';

const ItemSeparator = () => (
  <Box w="100%" px="sm" my="sm">
    <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
  </Box>
);

export default ItemSeparator;
