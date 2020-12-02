/**
 * This represents the image of a launch with a placeholder
 * if the image is not present.
 */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colours from '../colours';

const LaunchImage = ({ source }) => {
  return source ? (
    // resizeMode="cover" gives us nice equal proportions for all images
    // We do lose parts of the images, but how informative are those pics
    // anyway?
    <Image
      style={styles.image}
      source={{ uri: source }}
      resizeMode="cover"
      accessibilityHint="launch-image"
    />
  ) : (
    // Placeholder for when there's no image present in the launch object
    <View style={styles.placeholder}>
      <Text
        style={styles.placeholderText}
        accessibilityHint="launch-image-placeholder">
        Image unavailable
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
  },
  placeholder: {
    height: 150,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colours.lightGreyText,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LaunchImage;
