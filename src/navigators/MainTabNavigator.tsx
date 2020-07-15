import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import SearchScreen from '../components/search/SearchScreen';

const ListenNowStack = createStackNavigator();

const ListenNowNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{
          title: 'Listen Now',
        }}
        name="ListenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();

const LibraryNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        options={{
          title: 'Library',
        }}
        name="Library"
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        options={{
          title: 'Search',
        }}
        name="Search"
        component={SearchScreen}
      />
    </SearchStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          title: 'Listen Now',
        }}
        name="ListenNow"
        component={ListenNowNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Library',
        }}
        name="Library"
        component={LibraryNavigator}
      />
      <MainTab.Screen
        options={{
          title: 'Search',
        }}
        name="Search"
        component={SearchNavigator}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
