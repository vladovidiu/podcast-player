import React from 'react';
import {Box} from 'react-native-design-utility';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../constants/theme';

export const SearchIndicator = () => (
  <Box f={1} center h={300}>
    <ActivityIndicator size="large" color={theme.color.blueLight} />
  </Box>
);
