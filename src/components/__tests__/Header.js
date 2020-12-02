import React from 'react';
import { render } from 'react-native-testing-library';

import Header from '../Header';
jest.mock('react-redux');

describe('Header', () => {
  test('renders correctly', () => {
    const header = render(<Header />);
    expect(header.toJSON()).not.toBe(null);
  });
});
