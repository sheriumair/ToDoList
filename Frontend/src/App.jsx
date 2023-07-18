import {v4 as uuidv4} from 'uuid';

import {useEffect, useState} from 'react';
import './style.css';

import logo from '/MyPicture.jpg';

import axios from 'axios';
import NewTodoForm from './NewTodoForm';
import TodoItem from './TodoItem';
import React from 'react';


/**
 * The main component for the application.
 *
 * @return {JSX.Element} The rendered JSX element.
 */
export default function App() {
/**
 * State variable for storing a new item.
 *
 * @type {string}
 */
  const [newItem, setNewItem]=useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [todos, setTodos]=useState(()=>{
    const localValue=localStorage.getItem('ITEMS');
    if (localValue==null) {
      return ([]);
    }
    return JSON.parse(localValue);
  });

  useEffect(()=>{
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);


  // Function when the Add button is pressed
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if (newItem.trim() === '') {
      return; // Don't add empty task
    }
    const key = uuidv4(); // Generating a unique key for the task

    setIsLoading(true);
    try {
      await axios.post('http://localhost:3000/api/todos', {task: newItem, key});
      setTodos((currentTodos)=>{
        return [
          ...currentTodos,
          {key,
            title: newItem,
            completed: false,
            creationTime: new Date().toISOString()},
        ];
      });

      setError(null);
      setNewItem('');
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
      setError(error.message);
      setIsLoading(false);
    }
  };


  /**
 * Toggles the completion status of a todo item.
 * @param {string} key - The key of the todo item.
 * @param {boolean} completed - The new completion status of the todo item.
 */
  function toggleTodo(key, completed) {
    const updateTodo = async (updatedTodo) => {
      try {
        await axios.put(`http://localhost:3000/api/todos/${key}`, updatedTodo);
        setError(null);
      } catch (error) {
        console.log('Error updating todo', error);
        setError(error.message);
      }
    };
    setIsLoading(true);
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.key === key) {
          if (!todo.completed) {
          // Task is completed for the first time
            const updatedTodo = {...todo, completed: true, completedTime:
            new Date().toISOString()};
            updateTodo(updatedTodo); // Make the API request to update the todo
            setIsLoading(false);
            return updatedTodo;
          } else if (todo.completed) {
          // Task is marked as incomplete
            setIsLoading(false);
            return {...todo, completed: false, completedTime: null};
          }
        }
        setIsLoading(false);
        return todo;
      });
    });
  }


  // Funnction to deleteTODO
  const deleteTodo = async (key) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/todos/${key}`);
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.key !== key));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log('Error deleting task', error);
      setIsLoading(false);
      setError(error.message);
    }
  };


  return (
    <>
      <img src={logo} alt="Logo" className="logo" />
      <NewTodoForm
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />

      <ul className="list">
        {todos.length === 0 && <p>Alas! You have nothing to do.</p>}
        {todos.map((todo) => (
          <TodoItem
            key={todo.key}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>

    </>

  );
}
