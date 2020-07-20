import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {UtilityThemeProvider} from 'react-native-design-utility';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import TrackPlayer from 'react-native-track-player';

import {theme} from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import {client} from './src/graphql/client';
import {ActivityIndicatorWrapper} from './src/components/ActivityIndicatorWrapper';
import {PlayerContextProvider} from './src/contexts/PlayerContext';
import {DBProvider} from './src/contexts/DBContext';

const App = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
        ],
        jumpInterval: 30,
      });
      setIsReady(true);
    });
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
      <DBProvider>
        <ApolloProvider client={client}>
          {isReady ? (
            <PlayerContextProvider>
              <NavigationContainer>
                <MainStackNavigator />
              </NavigationContainer>
            </PlayerContextProvider>
          ) : (
            <ActivityIndicatorWrapper />
          )}
        </ApolloProvider>
      </DBProvider>
    </UtilityThemeProvider>
  );
};

export default App;
