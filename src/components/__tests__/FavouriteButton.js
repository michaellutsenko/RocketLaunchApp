import React from 'react';
import FavouriteButton from '../FavouriteButton';
import { render } from 'react-native-testing-library';

jest.mock('react-redux');

describe('FavouriteButton', () => {
  test('renders correctly when provided all props', () => {
    const button = render(<FavouriteButton launch={{}} isFavourite={true} />);
    expect(button).not.toBe(null);
  });

  test('renders nothing when not provided a launch', () => {
    const button = render(<FavouriteButton />);
    expect(button.toJSON()).toEqual(null);
  });

  test('renders favourites in nice sexy orange', () => {
    const button = render(
      <FavouriteButton launch={{ test: true }} isFavourite={true} />,
    );
    const icon = button.getByA11yHint('favourite-icon-active');
    expect(icon).toBeTruthy();
  });
});
