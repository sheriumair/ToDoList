

const express = require('express');
const mongoose = require('mongoose');
const todoController = require('./controllers/TodoController');

require('dotenv/config');

const app = express();

app.use(express.json());

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', todoController);

mongoose
  .connect(process.env.DB_Connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected Successfully with the DB'))
  .catch((err) => {
    console.error(err);
  });

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});