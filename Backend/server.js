//importing modules and files

const express=require('express');

const axios=require('axios');

require('dotenv/config'); // for DB connection 

const mongoose=require('mongoose');

const ToDo=require('./models/List.js');





const app=express();
app.use(express.json());

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Create a new todo
app.post('/api/todos',async (req,res)=>{
   const {task}=req.body;
    
   try{
    if(!task){
        return res.status(400).json({error:'Task is required!!!'});
    }
     const newTodo=new ToDo({
      task
    
     })

     await newTodo.save();
     console.log("ToDo saved to DB");
     res.status(200).json({message:'Todo created successfully'});
    
    }catch(error){
        console.log('Error creating Todo',error);
        res.status(500).json({error:'An error has occured'});
    }

})

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  
  const { id } = req.params;
     console.log(req.params);
    ToDo.findByIdAndDelete(id)
      .then((deletedTodo) => {
        if (!deletedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        return res.json(deletedTodo);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: 'Failed to delete todo' });
      });
  });
  


//Connection  to Mongo_DB
  mongoose.connect(process.env.DB_Connection, {useNewUrlParser: true, useUnifiedTopology: true } )
  .then(() => console.log('Connected Successfully with the DB'))
  .catch((err) => { console.error(err); });

  app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
  });