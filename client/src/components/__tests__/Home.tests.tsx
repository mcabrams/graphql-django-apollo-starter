import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Home } from '../Home';

describe('Home', () => {
  it('should say hello world', () => {
    const { getByTestId } = render(
      <Home />,
    );
    expect(getByTestId('home')).toHaveTextContent('Hello world!');
  });
});
