FROM mhart/alpine-node:10

# Set the default working directory
WORKDIR /usr/src

# Retrieve and relate to the `FA_TOKEN` environment variable
ARG FA_TOKEN

# Print into `.npmrc` with a string using the `FA_TOKEN` ARG
RUN echo "@fortawesome:registry=https://npm.fontawesome.com/" > ./.npmrc
RUN echo "//npm.fontawesome.com/:_authToken=$FA_TOKEN" >> ./.npmrc

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy the relevant files to the working directory
COPY . .

# Build and export the app
RUN yarn build
RUN mv ./dist /public
