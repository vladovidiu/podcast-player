import React from 'react';
import {Box, Text} from 'react-native-design-utility';

export const SearchEmpty = () => (
  <Box f={1} center>
    <Text color="grey">No podcast found</Text>
  </Box>
);
