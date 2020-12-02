/**
 * Header block (blue).
 * Contains the app title and the search bar.
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import colours from '../colours';

const Header = () => {
  const search = useSelector((state) => state.search);
  const loading = useSelector((state) => state.requestInfo.loading);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rocket Launches</Text>
      <Text style={[styles.title, styles.subtitle]}>all over the world</Text>

      {/* Search container with rounded corners */}
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          // iOS only
          clearButtonMode="always"
          // Wait for a second until the input ends, then dispatch the action
          onChangeText={debounce((text) => {
            dispatch({ type: 'SEARCH', query: text });
          }, 1000)}
          placeholder="Search"
          style={styles.input}
        />

        {/* If a search is ongoing, show the activity indicator */}
        {!!search && loading && <ActivityIndicator size="small" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.blue,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 20,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: colours.white,
  },
  subtitle: {
    fontSize: 12,
  },
  inputContainer: {
    width: '70%',
    height: 30,
    backgroundColor: colours.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 0,
  },
});

export default Header;
