FROM node:20-alpine

WORKDIR /app

# Copy package.json from the root directory
COPY ../package.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
