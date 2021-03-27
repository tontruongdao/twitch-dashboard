const express = require('express');

require("dotenv").config();

// Fetch data on twitch API /api/game/:id
// 494131

const getData = async (q) => {

    let fetchLink = `https://api.twitch.tv/helix/streams?game_id=${q}`

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
        game: data.data[0].game_name,
        viewer: data.data[0].viewer_count,

    });
    } catch (err) {
        return res.status(500).json({
        success: false,
        error: "Server Error",
        });
    }
};