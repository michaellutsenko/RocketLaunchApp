/**
 * Main (root) view of the app
 * Functions as sort of a container
 * Uses the safe area padding color workaround
 * Source: https://medium.com/@calebmackdaven/setting-background-color-with-safeareaview-in-react-native-1ca621ccd9a
 */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import TabSwitch from '../components/TabSwitch';
import AllLaunches from './AllLaunches';
import Favourites from './Favourites';
import { getLaunches } from '../store/actions';
import colours from '../colours';

const MainView = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const [searchPending, setSearchPending] = useState(false);
  const requestInfo = useSelector((state) => state.requestInfo);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const loadLaunches = () => {
    // Reload list only if:
    // 1. There's no active request (requestInfo.loading)
    // 2. We're in the main tab (we don't want to fetch the list while
    // we're searching through the favourites)
    // 3. There's a search pending (to refetch the list with a search query)
    // when we return to the main tab
    if ((!requestInfo.loading && currentTab === 'all') || searchPending) {
      dispatch(getLaunches(search));
    }
  };

  // First effect fetches the list of launches
  // The dependencies are search and currentTab
  // We want to reload the list when search changes
  // or when we go back from favourites (in case search has been changed)
  useEffect(loadLaunches, [search, currentTab]);

  // The second effect is to keep track of search changes while
  // in the favourites tab. This helps trigger a new fetch
  // when we go back to the main tab
  useEffect(() => {
    !!search && setSearchPending();
  }, [search]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colours.blue} />
      <SafeAreaView style={styles.backdrop} />
      <SafeAreaView style={styles.container}>
        <Header />
        <TabSwitch
          currentTab={currentTab}
          onChangeTab={(tab) => setCurrentTab(tab)}
        />
        <View style={styles.container}>
          {currentTab === 'all' && <AllLaunches />}
          {currentTab === 'favourites' && <Favourites />}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.greyBackground,
  },
  backdrop: {
    flex: 0,
    backgroundColor: colours.blue,
  },
});

export default MainView;
