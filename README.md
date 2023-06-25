
# ToDoList Application

The ToDoList application is a simple web-based task management tool that allows users to create and manage their to-do tasks.

## Features

- Create a new task with a title
- Mark tasks as completed
- Delete tasks from the list
- Local storage to persist tasks even after page reloads
-Saving the tasks in Database for future use

## Technologies Used

- Backend: Node.js, Express.js, MongoDB
- Frontend: React, HTML, CSS
- Docker: Containerization and deployment

## Getting Started

### Prerequisites

- Docker installed on your machine
- Docker Compose (optional)

### Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-list.git

2. Navigate to Project directory
      cd ToDoList

3. Make a .env file for backend. Here add Mongo Db connection URL. The variable name is as shown below
    DB_Connection:

4.  Build and run the Docker containers:
    docker-compose up -d


Your frontend will be available at  **http://localhost:5173.**

_Contributing_
Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.



