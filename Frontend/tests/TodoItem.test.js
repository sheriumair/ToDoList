import { render, fireEvent,screen } from '@testing-library/react';
import TodoItem from '../src/TodoItem';
import React from 'react';

test('renders the todo item with correct details', () => {
    const todo = {
      key: '1',
      title: 'Test Todo',
      completed: false,
      creationTime: '2023-07-19T12:00:00Z',
      completedTime: null,
    };
  
    const toggleTodo = jest.fn();
    const deleteTodo = jest.fn();
  
    render(<TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />);
  
    const todoTitle = screen.getByText(todo.title);
    expect(todoTitle).toBeInTheDocument();
  
    const showDetailsButton = screen.getByText('Show Details');
    fireEvent.click(showDetailsButton);
  
    const creationTimeText = screen.getByText((content, element) => {
      // Check if the element's text content contains the desired string
      return content.includes('Creation Time: 2023-07-19T12:00:00Z');
    });
  
    expect(creationTimeText).toBeInTheDocument();
  
    /*const checkbox = screen.getByLabelText(todo.title);
    fireEvent.change(checkbox, { target: { checked: true } });
  
    expect(toggleTodo).toHaveBeenCalledWith(todo.key, true);
  
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
  
    expect(deleteTodo).toHaveBeenCalledWith(todo.key);*/
  });