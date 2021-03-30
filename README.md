# Twitch API Demo

https://truong-twitch-dashboard.herokuapp.com/

This is a quick demo on using Twitch's API using socket.io on a fullstack app with React and Node Express server.
The application rerenders the data every 20 seconds, to not exceed twitch API fetch request.
I used "socket.io", "chart.js" to help on certain app capability and used "styled-components" for styling.

### Installation

```
npm run install
# or
yarn install
```

### local deployment of the app

To create the build folder for the front-end run the following commands. This is
to test if heroku will be able to deploy the app. You can test the full app at
`http:/localhost:4000/`

```
npm run build:client
# or
yarn build:client

# then run this command
npm run start
```

### API endpoints

```
# return array of objects containing total views for each game
/api/views

# return info about each games' ID
/api/games
```
