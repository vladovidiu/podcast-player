import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {Image, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {ActivityIndicatorWrapper} from '../ActivityIndicatorWrapper';
import {FeedQuery, FeedQueryVariables} from '../../types/graphql';
import feedQuery from '../../graphql/feedQuery';
import {SearchStackRouteParamsList} from '../../navigators/types';
import PlayLastEpisode from './PlayLastEpisode';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsHeader = () => {
  const {data: podcastData} = useRoute<NavigationParams>().params ?? [];
  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {feedUrl: podcastData.feedUrl},
  });
  return (
    <>
      <Box dir="row" px="sm" mt="sm" mb="md">
        {podcastData.thumbnail && (
          <Box mr={10}>
            <Image source={{uri: podcastData.thumbnail}} style={s.thumbnail} />
          </Box>
        )}
        <Box f={1}>
          <Text size="md" bold>
            {podcastData.podcastName}
          </Text>
          <Text size="xs" color="grey">
            {podcastData.artist}
          </Text>
          <Text size="xs" color="blueLight">
            {'Subscribed'}
          </Text>
        </Box>
      </Box>

      <PlayLastEpisode episode={data} podcast={podcastData} />

      <Box px="sm" mb="md">
        <Text size="lg" bold>
          Episodes
        </Text>
      </Box>

      {loading && <ActivityIndicatorWrapper />}
    </>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default PodcastDetailsHeader;
