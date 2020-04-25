FROM node:13.10.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm install
EXPOSE $IRSJPY_LOCATION_PORT
ENV IRSJPY_LOCATION_PORT $IRSJPY_LOCATION_PORT
CMD [ "npm", "start" ]
