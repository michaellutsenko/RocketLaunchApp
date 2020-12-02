/**
 * Favourite button.
 * The "star" icon that's drawn on every flight card
 * Changes from "outline" to "solid" based on the favourite status.
 */
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addFavourite, removeFavourite } from '../store/actions';
import colours from '../colours';

const buttonStyle = {
  height: 40,
  width: 40,
  position: 'absolute',
  bottom: 10,
  right: 10,
  justifyContent: 'center',
  alignItems: 'center',
};

const FavouriteButton = ({ launch, isFavourite }) => {
  const dispatch = useDispatch();

  return launch ? (
    <TouchableOpacity
      onPress={() =>
        isFavourite
          ? dispatch(removeFavourite(launch))
          : dispatch(addFavourite(launch))
      }
      style={buttonStyle}>
      {isFavourite ? (
        // react-native-vector-icons
        <Icon
          name="star"
          color={colours.orange}
          size={26}
          accessibilityHint="favourite-icon-active"
        />
      ) : (
        <Icon
          name="star-o"
          color={colours.orange}
          size={26}
          accessibilityHint="favourite-icon-inactive"
        />
      )}
    </TouchableOpacity>
  ) : null;
};

export default FavouriteButton;
