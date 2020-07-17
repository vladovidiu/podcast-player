import React, {useState} from 'react';
import {Box} from 'react-native-design-utility';
import {TextInput, StyleSheet, FlatList} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {theme} from '../../constants/theme';
import {
  SearchQuery,
  SearchQuery_search,
  SearchQueryVariables,
} from '../../types/graphql';
import searchQuery from '../../graphql/searchQuery';
import {SearchEmpty} from './SearchEmpty';
import {SearchElement} from './SearchElement';
import {ActivityIndicatorWrapper} from '../ActivityIndicatorWrapper';
import {SearchError} from './SearchError';

const SearchScreen = () => {
  const [term, setTerm] = useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({variables: {term}});
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" my="sm">
        <Box
          dir="row"
          align="center"
          h={40}
          bg="greyLightest"
          radius={10}
          px="sm">
          <Box mr={10}>
            <FeatherIcon name="search" size={20} color={theme.color.greyDark} />
          </Box>
          <TextInput
            style={style.input}
            placeholder="Search Podcast"
            selectionColor={theme.color.blueLight}
            onChangeText={setTerm}
            autoCorrect={false}
            onSubmitEditing={onSearch}
            value={term}
          />
        </Box>
      </Box>

      {error ? (
        <SearchError {...{error}} />
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          data={data?.search ?? []}
          ListHeaderComponent={<>{loading && <ActivityIndicatorWrapper />}</>}
          ListEmptyComponent={<>{!loading && <SearchEmpty />}</>}
          renderItem={({item}) => <SearchElement {...{item}} />}
          keyExtractor={(item) => String(item.feedUrl)}
        />
      )}
    </Box>
  );
};

const style = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.text.size.md,
  },
});

export default SearchScreen;
