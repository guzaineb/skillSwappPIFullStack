FROM node:20-alpine

WORKDIR /app

# Copy only the backend package.json and package-lock.json
COPY package.json ./

RUN npm install

# Copy everything from backend (context is backend/)
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
