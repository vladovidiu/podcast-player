import React from 'react';
import {Box, Text} from 'react-native-design-utility';

interface Props {
  error: {
    message: string;
  };
}

export const SearchError: React.FC<Props> = ({error}) => (
  <Box f={1} center>
    <Text color="red">{error.message}</Text>
  </Box>
);
