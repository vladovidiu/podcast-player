import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box, Text} from 'react-native-design-utility';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {getWeekDay, humanReadableDuration} from '../../lib/dateTimeHelpers';
import {FeedQuery_feed, SearchQuery_search} from '../../types/graphql';

interface Props {
  item: FeedQuery_feed;
  podcast: SearchQuery_search;
}

const PodcastDetailsElement = (props: Props) => {
  const navigation = useNavigation();
  const {item, podcast: podcastData} = props;

  return (
    <Box px="sm">
      <Text size="xs" color="grey">
        {getWeekDay(new Date(item.pubDate)).toUpperCase()}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('EpisodeDetailsScreen', {
            episode: item,
            podcast: podcastData,
          })
        }>
        <Text bold>{item.title}</Text>
      </TouchableOpacity>
      <Box mb="xs">
        <Text size="sm" color="grey" numberOfLines={2}>
          {item.summary}
        </Text>
      </Box>
      <Text size="sm" color="grey">
        {humanReadableDuration(item.duration)}
      </Text>
    </Box>
  );
};

export default PodcastDetailsElement;
