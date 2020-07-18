import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {theme} from '../../constants/theme';
import {usePlayerContext} from '../../contexts/PlayerContext';
import {FeedQuery, SearchQuery_search} from '../../types/graphql';

interface Props {
  episode: FeedQuery | undefined;
  podcast: SearchQuery_search;
}

const PlayLastEpisode = (props: Props) => {
  const {episode: data, podcast: podcastData} = props;
  const playerContext = usePlayerContext();
  return (
    <Box px="sm" mb="md" dir="row" align="center">
      <Box mr={10}>
        <TouchableOpacity
          onPress={() => {
            const el = data?.feed[0];
            if (!el) {
              return;
            }
            playerContext.play({
              title: el.title,
              artwork: el.image ?? podcastData.thumbnail,
              id: el.linkUrl,
              url: el.linkUrl,
              artist: podcastData.artist,
            });
          }}>
          <FeatherIcon name="play" size={30} color={theme.color.blueLight} />
        </TouchableOpacity>
      </Box>
      <Box f={1}>
        <Text bold>Play</Text>
        <Text size="sm">{data?.feed[0].title}</Text>
      </Box>
    </Box>
  );
};

export default PlayLastEpisode;
