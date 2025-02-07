import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Dummy from './Dummy';

describe('Dummy file', () => {
  test('render dummy file', async () => {
    render(<Dummy />);
    expect(screen.getByText('Dummy text')).toBeTruthy();
  });
});
