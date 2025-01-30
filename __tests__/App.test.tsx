/**
 * @format
 */

import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from '../App';


describe('App file', () => {
  test('render app file', async () => {
    render(<App />);
    expect(screen.getByText('App screen')).toBeTruthy();
  });
});
