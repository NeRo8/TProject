import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Dummy from './Dummy';

describe('App file', () => {
  test('render app file', async () => {
    render(<Dummy />);
    expect(screen.getByText('Dummy text')).toBeTruthy();
  });
});
