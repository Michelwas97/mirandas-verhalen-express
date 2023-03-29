const storyApi = require('../models/storyApi.js');

async function handleData(req, res) {
  const data = await storyApi.getStories();

  return data;
}

async function speechSetup(req, res) {
  //TODO: speech setup
}

module.exports = {
    handleData
  };