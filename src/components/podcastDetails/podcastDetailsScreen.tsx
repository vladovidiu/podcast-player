import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlatList, Image, StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {SearchStackRouteParamsList} from '../../navigators/types';
import {theme} from '../../constants/theme';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const {data} = useRoute<NavigationParams>().params ?? [];
  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {data.thumbnail && (
                <Box mr={10}>
                  <Image source={{uri: data.thumbnail}} style={s.thumbnail} />
                </Box>
              )}
              <Box f={1}>
                <Text size="md" bold>
                  {data.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {data.artist}
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
              <Box>
                <Text bold>Play</Text>
                <Text size="sm">#400 - The Last Episode</Text>
              </Box>
            </Box>

            <Box px="sm" mb="md">
              <Text size="lg" bold>
                Episodes
              </Text>
            </Box>
          </>
        }
        data={[{id: '1'}, {id: '2'}]}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
          </Box>
        )}
        renderItem={() => (
          <Box px="sm">
            <Text size="xs" color="grey">
              Friday
            </Text>
            <Text bold>#400 Episodes</Text>
            <Text size="sm" color="grey">
              Sumary
            </Text>
            <Text size="sm" color="grey">
              3h 13min
            </Text>
          </Box>
        )}
        keyExtractor={(item) => item.id}
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
