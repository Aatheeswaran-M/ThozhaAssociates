# Base image for Node.js (Vite requires Node 20+)
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install ALL dependencies (including devDependencies like Vite)
RUN npm install

# Bundle app source
COPY . .

# Expose the Vite development port
EXPOSE 5173

# Run the Vite development server and expose it to the network so we can access it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
