import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlatList, Image, StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useQuery} from '@apollo/client';

import {SearchStackRouteParamsList} from '../../navigators/types';
import {theme} from '../../constants/theme';
import {
  FeedQuery,
  FeedQueryVariables,
  FeedQuery_feed,
} from '../../types/graphql';
import feedQuery from '../../graphql/feedQuery';
import ItemSeparator from '../ItemSeparator';
import {ActivityIndicatorWrapper} from '../ActivityIndicatorWrapper';
import {getWeekDay, humanReadableDuration} from '../../lib/dateTimeHelpers';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const {data: podcastData} = useRoute<NavigationParams>().params ?? [];
  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {feedUrl: podcastData.feedUrl},
  });

  return (
    <Box f={1} bg="white">
      <FlatList<FeedQuery_feed>
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {podcastData.thumbnail && (
                <Box mr={10}>
                  <Image
                    source={{uri: podcastData.thumbnail}}
                    style={s.thumbnail}
                  />
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

            <Box px="sm" mb="md" dir="row" align="center">
              <Box mr={10}>
                <FeatherIcon
                  name="play"
                  size={30}
                  color={theme.color.blueLight}
                />
              </Box>
              <Box f={1}>
                <Text bold>Play</Text>
                <Text size="sm">{data?.feed[0].title}</Text>
              </Box>
            </Box>

            <Box px="sm" mb="md">
              <Text size="lg" bold>
                Episodes
              </Text>
            </Box>

            {loading && <ActivityIndicatorWrapper />}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => <ItemSeparator />}
        renderItem={({item}) => (
          <Box px="sm">
            <Text size="xs" color="grey">
              {getWeekDay(new Date(item.pubDate)).toUpperCase()}
            </Text>
            <Text bold>{item.title}</Text>
            <Text size="sm" color="grey" numberOfLines={2}>
              {item.description}
            </Text>
            <Text size="sm" color="grey">
              {humanReadableDuration(item.duration)}
            </Text>
          </Box>
        )}
        keyExtractor={(item) => item.linkUrl}
      />
    </Box>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default PodcastDetailsScreen;
