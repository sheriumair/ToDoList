
# ToDoList Application![Frontend](https://github.com/sheriumair/ToDoList/assets/53410074/d6f3cf06-7347-4578-8eee-6821c2f7791d)


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
- Unit Testing: Jest

## Getting Started

### Prerequisites

- Docker installed on your machine

### Installation and Setup

1. Clone the repository:

   ```bash
   [git clone https://github.com/sheriumair/todo-list.git](https://github.com/sheriumair/ToDoList.git)

2. Navigate to the Project directory

      cd ToDoList

3. Make a .env file for the backend. Here add Mongo Db connection URL. Example env is added in the repository.

4.  Build and run the Docker containers:

    docker-compose up 

5. For unit testing run the following command in the respective directory.

    npx jest 


Your frontend will be available at  **http://localhost:5173.**

_Contributing_
Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.



