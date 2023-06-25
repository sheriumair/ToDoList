# Use the official Node.js 18.14.0 image as the base image
FROM node:18.14.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend source code to the working directory
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port on which your frontend application will run
EXPOSE 5173

# Set the command to run your frontend application
CMD ["npm", "run", "dev"]