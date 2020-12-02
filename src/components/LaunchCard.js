/**
 * The infocard for every launch.
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import moment from 'moment';
import LaunchImage from './LaunchImage';
import FavouriteButton from './FavouriteButton';
import colours from '../colours';
import { get } from 'lodash';

// I'm using this library for browser views. It makes use of native
// iOS and Android components to open the "in-app" browser window
// As I understand, it's the industry standard nowadays instead of
// a WebView. Yes, I'm being rather liberal with the task, but once again
// in a real business task situation, this would be something I would
// definitely address and suggest a similar solution
import InAppBrowser from 'react-native-inappbrowser-reborn';

// I decided to use a generator here
// This is THE FIRST TIME I'm using one EVER
// How did I do? :)
//
// The reasoning is simple, there are multiple info links
// in the objects sent by the API and there's a clear priority
// of these links. I use this generator to get the required values
// one by one until one is found. This way I avoid using an actual
// full cycle.
const goThroughLaunchAndFindUrl = function* (launch) {
  yield get(launch, 'infoURLs');
  yield get(launch, 'mission.infoUrls');
  yield get(launch, 'rocket.configuration.info_url');
  yield get(launch, 'rocket.configuration.wiki_url');
  yield get(launch, 'rocket.configuration.manufacturer.info_url');
  yield get(launch, 'rocket.configuration.manufacturer.wiki_url');
};

/**
 * Get info URL for the launch.
 * Checks each possible route for an info link in priority.
 * @param {String} launch The launch object as received from the API
 */
const getInfoUrl = (launch) => {
  let iterator = goThroughLaunchAndFindUrl(launch);
  let result = {};

  while (!result.done) {
    result = iterator.next();
    const value = result.value;

    // The result may be a string, an object or an array.
    // Checking if it's a non-empty array
    if (Array.isArray(value) && value.length) {
      // Inside an array there may be strings or objects
      const maybeUrl = value[0];

      // Checking if it's a string
      if (typeof maybeUrl === 'string') {
        return maybeUrl;
      } else if (maybeUrl.url) {
        // If it's an object, it will have an "url" property
        return maybeUrl.url;
      }
    } else if (typeof value === 'string') {
      // If it's a string, just return a string
      return value;
    }
  }

  // In the rare case when nothing is found, just return null
  return null;
};

const LaunchCard = ({ launch, isFavourite }) => {
  const { name, status, net, image, pad } = launch;
  const url = getInfoUrl(launch);

  // Using moment to transform dates and convert them into strings
  // just because moment is convenient to use
  // but it could've been done with simple Date
  const date = moment(net);

  return (
    // The entire card is a touchable
    <TouchableOpacity
      style={styles.container}
      // When it's pressed, a browser window will appear
      onPress={() => url && InAppBrowser.open(url)}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <LaunchImage source={image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>
            {/* format('LL') gives a nice localised representation of the date */}
            Date: <Text style={styles.infoTextBold}>{date.format('LL')}</Text>
          </Text>
          {pad && (
            <Text style={styles.infoText}>
              Country:{' '}
              <Text style={styles.infoTextBold}>
                {pad.location.country_code}
              </Text>
            </Text>
          )}
          <Text style={styles.infoText}>
            Status:{' '}
            <Text style={styles.infoTextBold}>
              {/* A placeholder of sorts for when there's no status */}
              {status ? status.name : 'Unavailable'}
            </Text>
          </Text>
        </View>
      </View>

      {/* The favourite "star" button */}
      <FavouriteButton launch={launch} isFavourite={isFavourite(launch.id)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colours.white,
  },
  name: {
    fontSize: 16,
    color: colours.darkGreyText,
    fontWeight: 'bold',
  },
  body: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  info: {
    flex: 2,
    paddingLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: colours.darkGreyText,
  },
  infoTextBold: {
    fontWeight: 'bold',
  },
});

export default LaunchCard;
