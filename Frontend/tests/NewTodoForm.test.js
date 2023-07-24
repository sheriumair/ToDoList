import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from '../src/NewTodoForm.jsx';
import React from 'react';


test('displays "Loading..." message when isLoading is true', () => {
    const { getByText } = render(<NewTodoForm isLoading={true} />);
    const loadingMessage = getByText('Loading...');
  
    // Assert that the "Loading..." message is rendered
    expect(loadingMessage).toBeInTheDocument();
  });