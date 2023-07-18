import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from '../src/NewTodoForm.jsx';
import React from 'react';


test('allows users to input a new todo', () => { const handleAddTodo = jest.fn();

    const { getByPlaceholderText } = render(<NewTodoForm addTodo={handleAddTodo} />);
    
    fireEvent.change(getByPlaceholderText(/Enter task here/i), { target: { value: 'Test todo' } });
    
    const form = document.querySelector('.new-item_form'); fireEvent.submit(form);
    
    expect(handleAddTodo).toHaveBeenCalledWith('Test todo'); });