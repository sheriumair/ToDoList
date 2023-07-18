
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

test('renders the App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Alas! You have nothing to do./i);
  expect(linkElement).toBeInTheDocument();
});