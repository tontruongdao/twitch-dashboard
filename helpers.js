const fetch = require("isomorphic-fetch");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const countViews = async (data) => {
  let count = 0;
  data.forEach((stream) => {
    count += stream.viewer_count;
  });
  return count;
};

const getToken = async (url) => {
  const options = {
    url: process.env.GET_TOKEN,
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result.access_token;
};

const getStreams = async (url, games, accessToken) => {
  let final = [];

  const options = {
    method: "get",
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  for (const game of games) {
    let id = game.id;
    let name = game.name;
    const response = await fetch(
      `${url}?game_id=${game.id}&first=100`,
      options
    );
    const result = await response.json();
    const total_views = await countViews(result.data);
    final.push({ id, name, total_views });
  }

  return final;
};

const getGames = async (url, accessToken) => {
  const options = {
    method: "get",
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(
    `${url}?name=chess&name=dota%202&name=hearthstone&name=Rocket%20League`,
    options
  );
  const result = await response.json();

  return result.data;
};

module.exports = {
  getToken,
  getStreams,
  getGames,
  countViews,
};