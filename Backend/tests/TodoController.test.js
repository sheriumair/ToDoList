const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

const app = express();
let mongoServer;

// Startup code
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// DB disconnection
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const ToDoModel = require('../models/List.js');//

it('Should save user to database', async () => {
  await request(app).post('/api/todos')
      .send({task: 'Test Todo', key: '123'});

  expect(express.response.statusCode).toBe(200);
});

it('should update a todo', async () => {
  // Create a test todo
  const testTodo = new ToDoModel({
    task: 'Test Todo',
    key: '123',
  });
  await testTodo.save();

  // Make a PUT request
  await request(app)
      .put(`/api/todos/${testTodo.key}`)
      .send({completed: true, completedTime: '2023-07-19T12:00:00'});

  // Assertions
  expect(express.response.statusCode).toBe(200);
});

it('should delete a todo', async () => {
  // Create a test todo
  const testTodo = new ToDoModel({
    task: 'Test Todo',
    key: '124',
  });
  await testTodo.save();

  // Make a DELETE request
  await request(app).delete(`/api/todos/${testTodo.key}`);

  // Assertions
  expect(express.response.statusCode).toBe(200);
});


