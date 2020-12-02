/**
 * This is a simple tab switch
 * Highlights the active tab with a nice orange colour
 * Does nothing when pressing on the active tab
 */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colours from '../colours';

const TabSwitch = ({ currentTab, onChangeTab }) => {
  return (
    <View style={styles.container}>
      <TabButton name="all" currentTab={currentTab} onChangeTab={onChangeTab} />
      <TabButton
        name="favourites"
        currentTab={currentTab}
        onChangeTab={onChangeTab}
      />
    </View>
  );
};

const TabButton = ({ name, currentTab, onChangeTab }) => {
  const isActive = currentTab === name;
  return (
    <TouchableOpacity
      style={styles.tabButtonContainer}
      onPress={() => !isActive && onChangeTab(name)}>
      <View style={[styles.button, isActive && styles.buttonActive]}>
        <Text style={[styles.buttonText, isActive && styles.buttonActiveText]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // This shift to the top is to display the buttons on top of the
    // separation line between the header and the list
    top: -20,
  },
  tabButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  button: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colours.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonActive: {
    backgroundColor: colours.orange,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: colours.darkGreyText,
  },
  buttonActiveText: {
    color: colours.white,
  },
});

export default TabSwitch;
