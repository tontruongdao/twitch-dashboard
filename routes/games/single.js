const express = require('express');

require("dotenv").config();

// Fetch data on twitch API /api/game/:id

// ###### by ID #####
// const getData = async (q) => {

//     let fetchLink = `https://api.twitch.tv/helix/games?id=${q}`

//     const response = await fetch(fetchLink, {
// 	"method": "GET",
// 	"headers": {
//         "Authorization": `Bearer ${process.env.OAUTH_TOKEN}`,
//         "Client-ID": `${process.env.CLIENT_ID}`
// 	}
// })
//     return response.json();
// }

// ###### by Name #####
const getData = async (q) => {

    let fetchLink = `https://api.twitch.tv/helix/games?name=${q}`

    const response = await fetch(fetchLink, {
	"method": "GET",
	"headers": {
        "Authorization": `Bearer ${process.env.OAUTH_TOKEN}`,
        "Client-ID": `${process.env.CLIENT_ID}`
	}
})
    return response.json();
}

module.exports = async (req, res) => {

    const query = req.params.id;

    console.log("Going to fetch:", query);

    let data = await getData(query);

    console.log("Starting HERE");
    console.log("FETCH COMPLETED");
    console.log(data);

    try {
    return res.status(200).json({
        success: true,
        message: "Connected!",
        data: data,
    });
    } catch (err) {
        return res.status(500).json({
        success: false,
        error: "Server Error",
        });
    }
};