# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Install a lightweight web server to serve the built files
RUN yarn global add serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]