

const axios = require('axios');
const { expect } = require('chai');


describe('Todo API', () => {
  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const todoData = {
        task: 'Complete unit tests',
        key: '123456',
      };

      const response = await axios.post(`http://localhost:3000/api/todos`, todoData);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('message', 'Todo created successfully');
    });

    it('should return an error if task is missing', async () => {
      const todoData = {
        key: '123456',
      };

      try {
        await axios.post(`$http://localhost:3000/api/todos`, todoData);
      } catch (error) {
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('error', 'Task is required!!!');
      }
    });
  });

  describe('DELETE /api/todos/:key', () => {
    it('should delete an existing todo', async () => {
      const key = '123456';

      const response = await axios.delete(`http://localhost:3000/api/todos/${key}`);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('message', 'Todo deleted successfully');
    });

    it('should return an error if the todo does not exist', async () => {
      const key = 'nonexistent-key';

      try {
        await axios.delete(`http://localhost:3000/api/todos/${key}`);
      } catch (error) {
        expect(error.response.status).to.equal(404);
        expect(error.response.data).to.have.property('message', 'Todo not found');
      }
    });
  });

  describe('PUT /api/todos/:key', () => {
    it('should update an existing todo', async () => {
      const key = '123456';
      const updatedData = {
        completed: true,
        completedTime: new Date(),
      };

      const response = await axios.put(`http://localhost:3000/api/todos/${key}`, updatedData);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('message', 'Todo updated successfully');
    });

    it('should return an error if the todo does not exist', async () => {
      const key = 'nonexistent-key';
      const updatedData = {
        completed: true,
        completedTime: new Date(),
      };

      try {
        await axios.put(`http://localhost:3000/api/todos/${key}`, updatedData);
      } catch (error) {
        expect(error.response.status).to.equal(404);
        expect(error.response.data).to.have.property('message', 'Todo not found');
      }
    });
  });
});