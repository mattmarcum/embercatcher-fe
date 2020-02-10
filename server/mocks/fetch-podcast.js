'use strict';

module.exports = function(app) {
  const express = require('express');
  let fetchPodcastRouter = express.Router();

  fetchPodcastRouter.get('/', function(req, res) {
    res.send({
      name: 'test'
    });
  });
  app.use('/api/fetch-podcast', fetchPodcastRouter);
};
