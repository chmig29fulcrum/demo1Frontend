FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Set environment variables
ENV VITE_API_URL="/api/v1"
ENV VITE_BACKUP_URL="http://127.0.0.1:4000/api/v1"

EXPOSE 3000

CMD [ "npm", "start" ]
