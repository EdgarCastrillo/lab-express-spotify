'use strict';

const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here
const clientId = '4282619da1d845d69fc3e4e3e0c8c1ea';
const clientSecret = '634f17739e564cf8ad91cbfb4540926e';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

router.get('/', async (req, res, next) => {
  try {
    const searchArtist = req.query.search;
    const artist = await spotifyApi.searchArtists(searchArtist);
    // console.log(artist);
    res.render('artists.hbs', artist);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
