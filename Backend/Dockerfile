# Use the official Node.js 18.14.0 image as the base image
FROM node:18.14.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the backend source code to the working directory
COPY . .

# Expose the port on which your backend application is listening
EXPOSE 3000

# Set the command to run your backend application
CMD ["npm", "start"]