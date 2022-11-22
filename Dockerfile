FROM node:gallium-alpine

# Process env
ENV LOCAL_PORT=3000
ENV SSL_PORT=443

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE ${LOCAL_PORT}
EXPOSE ${SSL_PORT}
CMD [ "npm", "run", "start" ]
