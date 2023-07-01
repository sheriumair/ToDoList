
//To-Do list data modelling

const mongoose=require('mongoose');


const ToDoSchema=mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
     task: {
        type: String,
        required: true,
      },
     
      completed: {
        type: Boolean,
        default: false
      },
      completedTime: {
        type: Date,
        default: null
      },
      creationTime: {
        type: Date,
        default: Date.now
      }
    })

module.exports=mongoose.model('ToDoers',ToDoSchema)