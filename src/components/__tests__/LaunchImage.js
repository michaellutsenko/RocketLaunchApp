import React from 'react';
import { render } from 'react-native-testing-library';

import LaunchImage from '../LaunchImage';

describe('LaunchImage', () => {
  test('renders correctly when provided an url', () => {
    const launchImage = render(
      <LaunchImage source="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />,
    );
    expect(() => launchImage.getByA11yHint('launch-image')).not.toThrow();
  });

  test('renders a placeholder when not provided an url', () => {
    const launchImage = render(<LaunchImage />);
    let imagePlaceholder = null;

    expect(() => launchImage.getByA11yHint('launch-image')).toThrow();
    expect(
      () =>
        (imagePlaceholder = launchImage.getByA11yHint(
          'launch-image-placeholder',
        )),
    ).not.toThrow();

    expect(imagePlaceholder.children).toContain('Image unavailable');
  });
});
