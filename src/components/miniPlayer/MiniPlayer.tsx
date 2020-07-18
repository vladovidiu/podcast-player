import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

import {usePlayerContext} from '../../contexts/PlayerContext';
import {theme} from '../../constants/theme';

export const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <Box h={75} bg="white" px="sm" style={s.miniPlayer}>
      <Box f={1} dir="row" align="center" justify="between">
        <Box
          h={50}
          w={50}
          bg="blueLight"
          radius={10}
          mr={10}
          style={s.imageWrapper}>
          <Image
            source={{uri: playerContext.currentTrack.artwork}}
            style={s.image}
          />
        </Box>
        <Box f={1} mr={20}>
          <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
        </Box>
        <Box mr={10}>
          {playerContext.isPaused ? (
            <TouchableOpacity onPress={() => playerContext.play()}>
              <FeatherIcon name="play" size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={playerContext.pause}>
              <FeatherIcon name="pause" size={30} />
            </TouchableOpacity>
          )}
        </Box>
        <Box>
          <TouchableOpacity onPress={() => playerContext.seekTo(30)}>
            <FeatherIcon name="rotate-cw" size={30} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

const s = StyleSheet.create({
  miniPlayer: {
    borderTopWidth: 1,
    borderTopColor: theme.color.greyLightest,
  },
  imageWrapper: {
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
});
