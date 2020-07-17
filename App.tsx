import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {UtilityThemeProvider} from 'react-native-design-utility';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import TrackPlayer from 'react-native-track-player';

import {theme} from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import {client} from './src/graphql/client';
import trackPlayerService from './src/services/trackPlayerService';
import {ActivityIndicatorWrapper} from './src/components/ActivityIndicatorWrapper';
import {PlayerContextProvider} from './src/contexts/PlayerContext';

const App = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.registerPlaybackService(() => trackPlayerService);
      setIsReady(true);
    });
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
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
    </UtilityThemeProvider>
  );
};

export default App;
