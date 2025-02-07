/**
 * @format
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Test } from '../src/Test';

describe('Test component', () => {
  test('renders test file correctly', async () => {
    render(<Test />);
    expect(screen.getByText('Test component')).toBeTruthy();
  });
});
