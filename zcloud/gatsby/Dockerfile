FROM node:buster

# Create app directory
WORKDIR /app

# Install app dependencies
RUN npm -g install gatsby-cli

COPY package.json yarn yarn.lock ./

RUN ./yarn

# Bundle app source
COPY . .

# Build static files
RUN ./yarn run build

# serve on port 8080
CMD ["gatsby", "serve", "--verbose", "--prefix-paths", "-p", "8080", "--host", "0.0.0.0"]
