import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {Image, StyleSheet} from 'react-native';

import {SearchQuery_search} from '../../types/graphql';

interface Props {
  item: SearchQuery_search;
}

export const SearchElement: React.FC<Props> = ({item}) => (
  <Box h={90} dir="row" align="center" px="sm">
    <Box h={70} w={70} radius={10} mr={10}>
      {item.thumbnail && (
        <Image source={{uri: item.thumbnail}} style={style.image} />
      )}
    </Box>
    <Box f={1}>
      <Text bold numberOfLines={1}>
        {item.podcastName}
      </Text>
      <Text size="xs" color="grey">
        {item.artist}
      </Text>
      <Text size="xs" color="blueLight">
        {item.episodesCount}
      </Text>
    </Box>
  </Box>
);

const style = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10,
  },
});
