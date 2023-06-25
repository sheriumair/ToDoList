
import {useEffect, useState} from "react";
import "./style.css";

import logo from "/MyPicture.jpg"

import axios from 'axios'



export default function App(){
  const [newItem,setNewItem]=useState("")
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

  const handleSubmit= async(e)=>{
    
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/api/todos', { task: newItem });
      setTodos(currentTodos=>{
      return [
        ...currentTodos
        ,{id:crypto.randomUUID(),title:newItem,completed:false}
            ]})
            setNewItem("");
   }catch(error){
    console.log("Error", error);
   }
  }  
    
  
    
  function toggleTodo(id,completed){
      setTodos(currentTodos=>{
        return currentTodos.map(todo=>{
          if(todo.id===id){
            return {...todo,completed}
          }
          return todo
        })
      })
  }
  function deleteTodo(id,completed){
    setTodos(currentTodos=>{
      return currentTodos.filter(todo=> todo.id!==id)
        
      })
     
}
      return (
        <> 
              <img src={logo} alt="Logo" className="logo" />
             <form onSubmit={handleSubmit} className="new-item_form">
              <div className="form-row">
                <input value={newItem} onInput={e=> setNewItem(e.target.value)}
                type ="text" id ="item" placeholder="Enter task here" />
              </div>
              <button className="btn">Add</button>
            </form>
            
            
      
            <ul className="list">
              {todos.length===0 && "Alas! you have nothing to do."}
                {todos.map(todo=>{
                  return(
                  <li key={todo.id} >
                   <label>
                    <input type="checkbox" 
                    checked={todo.completed}
                    onChange={e=>toggleTodo(todo.id,e.target.values)}
                    />
                    {todo.title}
                   </label>
                    <button onClick={()=>deleteTodo(todo.id)}className="btn btn-danger">Delete</button>
                </li>)
                })}
               
            </ul>
      
         </>   
         
      )}