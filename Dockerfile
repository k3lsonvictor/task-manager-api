# Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install PostgreSQL client for potential database interactions
RUN apk add --no-cache postgresql-client

# Copy dependency files before the rest of the code
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire application (including the prisma folder)
COPY . .

# Generate the Prisma client (correcting the schema path)
RUN npx prisma generate --schema=./prisma/schema.prisma

# Expose the default API port
EXPOSE 3000

# Set the startup command to start the NestJS application
CMD ["npm", "run", "start:dev"]