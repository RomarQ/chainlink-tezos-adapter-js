FROM node

# Copy the sources to the container
COPY . /adapter
WORKDIR /adapter

# Install dependencies
RUN npm i

# Build the adapter
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
