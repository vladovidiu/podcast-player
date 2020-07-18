import React from 'react';
import {Box} from 'react-native-design-utility';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {useQuery} from '@apollo/client';

import {SearchStackRouteParamsList} from '../../navigators/types';
import {
  FeedQuery,
  FeedQueryVariables,
  FeedQuery_feed,
} from '../../types/graphql';
import feedQuery from '../../graphql/feedQuery';
import ItemSeparator from '../ItemSeparator';
import PodcastDetailsElement from './PodcastDetailsElement';
import PodcastDetailsHeader from './PodcastDetailsHeader';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const {data: podcastData} = useRoute<NavigationParams>().params ?? [];
  const {data} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {feedUrl: podcastData.feedUrl},
  });

  return (
    <Box f={1} bg="white">
      <FlatList<FeedQuery_feed>
        ListHeaderComponent={<PodcastDetailsHeader />}
        data={data?.feed}
        ItemSeparatorComponent={() => <ItemSeparator />}
        renderItem={({item}) => (
          <PodcastDetailsElement item={item} podcast={podcastData} />
        )}
        keyExtractor={(item) => item.linkUrl}
      />
    </Box>
  );
};

export default PodcastDetailsScreen;
