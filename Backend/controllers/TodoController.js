const express = require('express');
const ToDo = require('../models/List.js');

const router = new express.Router();


// Endpoint for posting the task
router.post('/todos', async (req, res) => {
  const {task, key} = req.body;

  try {
    if (!task) {
      return res.status(400).json({error: 'Task is required!!!'});
    }

    const newTodo = new ToDo({
      task,
      key,
    });

    await newTodo.save();
    console.log('ToDo saved to DB');
    res.status(200).json({message: 'Todo created successfully'});
  } catch (error) {
    console.log('Error creating Todo', error);
    res.status(500).json({error: 'An error has occurred'});
  }
});


// Endpoint for deleting the task
router.delete('/todos/:key', async (req, res) => {
  const primeKey = req.params.key;

  try {
    const deletedTodo = await ToDo.findOneAndDelete({key: primeKey});

    if (!deletedTodo) {
      return res.status(404).json({message: 'Todo not found'});
    }

    return res.status(200).json({message: 'Todo deleted successfully'});
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'});
  }
});

// Endpoint for updating the task
router.put('/todos/:key', async (req, res) => {
  const key = req.params.key;
  const {completed, completedTime} = req.body;

  try {
    const updatedTodo = await ToDo.findOneAndUpdate({key},
        {completed, completedTime}, {new: true});

    if (!updatedTodo) {
      return res.status(404).json({message: 'Todo not found'});
    }

    return res.status(200).json({message: 'Todo updated successfully'});
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'});
  }
});

module.exports = router;
