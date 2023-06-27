import { v4 as uuidv4 } from 'uuid';

import {useEffect, useState} from "react";
import './style.css';

import logo from "/MyPicture.jpg"

import axios from 'axios'



export default function App(){
  const [newItem,setNewItem]=useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleDetails, setVisibleDetails] = useState([]);

  const [todos,setTodos]=useState(()=>{
     const localValue=localStorage.getItem("ITEMS")
      if(localValue==null) {
          return ([])
        }
      return JSON.parse(localValue)
  })

  useEffect(()=>{
     localStorage.setItem("ITEMS",JSON.stringify(todos))

  },[todos])



  //Function when the Add button is pressed
  const handleSubmit= async(e)=>{
    
    e.preventDefault();
    if (newItem.trim() === "") {
      return; // Don't add empty task
    }
    const key = uuidv4(); // Generating a unique key for the task

    setIsLoading(true);
    try{
      const response = await axios.post('http://localhost:3000/api/todos', { task: newItem, key });
      setTodos(currentTodos=>{
      return [
        ...currentTodos
        ,{key,
          title:newItem,
          completed:false,
          creationTime:new Date().toISOString()  }
            ]})
            
            setError(null);
         setNewItem("");
         setIsLoading(false);
   }catch(error){
    console.log("Error", error);
    setError(error.message);
    setIsLoading(false);
   }
  }  



// Function for when the SHOW DETAILS button is pressed
  const handleDetailsButtonClick = (key) => {
    if (visibleDetails.includes(key)) {
      setVisibleDetails(visibleDetails.filter((item) => item !== key));
    } else {
      setVisibleDetails([...visibleDetails, key]);
    }
  };
  
  const isDetailsVisible = (key) => visibleDetails.includes(key);
    
  
   // Function for when the Box  button is checked
  function toggleTodo(key,completed){
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
          const updatedTodo = { ...todo, completed: true, completedTime: new Date().toISOString() };
          updateTodo(updatedTodo); // Make the API request to update the todo
          setIsLoading(false);
          return updatedTodo;
        } else if (todo.completed) {
          // Task is marked as incomplete
          setIsLoading(false);
          return { ...todo, completed: false };
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
      setTodos(currentTodos => currentTodos.filter(todo => todo.key !== key));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log("Error deleting task", error);
      setIsLoading(false);
      setError(error.message);
    }
  };
     
 

      return (
        <> 
              <img src={logo} alt="Logo" className="logo" />
             <form onSubmit={handleSubmit} className="new-item_form">
              <div className="form-row">
                <input value={newItem} onInput={e=> setNewItem(e.target.value)}
                type ="text" id ="item" placeholder="Enter task here" />
              </div>
              <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add'}
              </button>
            </form>
            
            {isLoading &&
             <p>Loading...</p>}
            
            {error && <p>Error: {error}</p>}

            <ul className="list">
              {todos.length===0 && "Alas! you have nothing to do."}
                {todos.map(todo=>{
                  return(
                  <li key={todo.key} >
                   <label>
                    <input type="checkbox" 
                    checked={todo.completed}
                    onChange={e=>toggleTodo(todo.key,e.target.values)}
                    />
                    {todo.title}
                    </label>
                          <div className="task">
                          <button onClick={()=>deleteTodo(todo.key)}className="btn btn-danger">Delete</button>
                          </div>
                          <div className="Data">
                          <button onClick={() => handleDetailsButtonClick(todo.key)}>Show Details</button>
                          {isDetailsVisible(todo.key) && (
                        <div>
                          Creation Time: {todo.creationTime}<br/>
                          Completion Time: {todo.completedTime}
                        </div>
    )}
                          </div>

                    
                </li>)
                })}
               
            </ul>
      
         </>   
         
      )}