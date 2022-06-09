FROM node:alpine as builder

# set the working dir for container
WORKDIR /app

# copy the json file first
COPY ./package.json /app

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# build the folder
CMD [ "npm", "run", "start" ]