/**
 * The general list component for launch cards.
 */
import React from 'react';
import { debounce } from 'lodash';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import LaunchCard from './LaunchCard';
import Spinner from './Spinner';
import Separator from './Separator';

// Using FlatList for its performance essentially
// Could've been done with a ScrollView, but why?
const LaunchList = ({ items, emptyMessage, onEndReached }) => {
  const { loading } = useSelector((state) => state.requestInfo);
  const favourites = useSelector((state) => state.favourites);

  // The "check if the launch is in favourites" function
  // It could've been done differently, saving only the IDs of favourites
  // but it would've also required fetching them one by one from the API.
  // Otherwise, it could've been two collections: favourites and favouriteIds
  // but I decided on a simpler variant
  const isFavourite = (id) => !!favourites.find((launch) => launch.id === id);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <LaunchCard launch={item} isFavourite={isFavourite} />
      )}
      keyExtractor={(item) => item.id}
      // If the list hasn't loaded yet, show spinner
      // If the list has loaded, but empty, show ListEmptyComponent
      ListEmptyComponent={
        loading
          ? Spinner
          : () => <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      }
      // If there are items in the list and we're loading something,
      // show Spinner. Otherwise, render nothing
      ListFooterComponent={items.length && loading ? Spinner : null}
      ItemSeparatorComponent={Separator}
      // Note the options in debounce()
      onEndReached={
        onEndReached &&
        debounce(onEndReached, 2000, {
          // Execute the function on the first call in 2 seconds
          leading: true,
          // Do not execute the function on he last call
          trailing: false,
        })
      }
      onEndReachedThreshold={0.3}
      contentContainerStyle={items.length ? {} : styles.emptyContainer}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  emptyMessage: {
    fontSize: 20,
    color: 'lightgrey',
  },
});

export default LaunchList;
