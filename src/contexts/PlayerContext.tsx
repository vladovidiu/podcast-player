import React, {createContext, useContext, useState, useEffect} from 'react';
import TrackPlayer, {
  State as TrackPlayerState,
  Track,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
} from 'react-native-track-player';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (track?: Track) => void;
  pause: () => void;
  seekTo: (seconds?: number) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  seekTo: () => null,
});

export const PlayerContextProvider: React.FC = (props) => {
  const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
  const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-state',
      ({state}: {state: TrackPlayerState}) => {
        setPlayerState(state);
      },
    );

    return () => {
      listener.remove();
    };
  }, []);

  const play = async (track?: Track) => {
    if (!track) {
      if (currentTrack) {
        await TrackPlayer.play();
      }

      return;
    }

    if (currentTrack) {
      await TrackPlayer.reset();
    }
    await TrackPlayer.add([track]);
    setCurrentTrack(track);
    TrackPlayer.play();
  };
  const pause = async () => {
    await TrackPlayer.pause();
  };
  const seekTo = async (seconds: number = 30) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + seconds);
  };

  const value: PlayerContextType = {
    isPlaying: playerState === STATE_PLAYING,
    isPaused: playerState === STATE_PAUSED,
    isStopped: playerState === STATE_STOPPED,
    isEmpty: playerState === null,
    currentTrack,
    play,
    pause,
    seekTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
