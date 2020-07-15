import React, {useState} from 'react';
import {Box} from 'react-native-design-utility';
import {TextInput, StyleSheet, FlatList} from 'react-native';
import {useLazyQuery} from '@apollo/client';

import {theme} from '../../constants/theme';
import {
  SearchQuery,
  SearchQuery_search,
  SearchQueryVariables,
} from '../../types/graphql';
import searchQuery from '../../graphql/searchQuery';
import {SearchEmpty} from './SearchEmpty';
import {SearchElement} from './SearchElement';
import {SearchIndicator} from './SearchIndicator';
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

      {error ? (
        <SearchError {...{error}} />
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          data={data?.search ?? []}
          ListHeaderComponent={<>{loading && <SearchIndicator />}</>}
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
    height: 40,
    flex: 1,
    backgroundColor: theme.color.greyLightest,
    borderRadius: 10,
    paddingHorizontal: theme.space.sm,
    fontSize: theme.text.size.md,
  },
});

export default SearchScreen;
