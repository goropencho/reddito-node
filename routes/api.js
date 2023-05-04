var express = require('express');
var router = express.Router();
var axios = require('axios')
var _ = require('lodash')
var createError = require('http-errors');



function isRedditUrl(url) {
  // Use a regular expression to test if the url matches the reddit domain
  let regex = /^https?:\/\/(www\.)?reddit\.com/;
  return regex.test(url);
}

function formatUrl(url) {
  let flag = isRedditUrl(url)
  if (flag) {
    if (url.endsWith(".json")) return url
    if (url.endsWith("/")) {
      url = url.slice(0, -1)
      url = url + ".json"
      return url
    }
  }
  return
}

router.get('/video', function (req, res) {
  try {
    let url = req.query.url
    let formattedUrl = formatUrl(url);
    if(!formattedUrl) res.status(400).send("Invalid Reddit Url")
    let config = {
      Headers: {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0"
      }
    }
    return axios.get(formattedUrl, config)
      .then(resp => {
        let repsonse = resp.data;
        let videoUrl = _.get(repsonse, "0.data.children.0.data.secure_media.reddit_video.fallback_url")
        if (videoUrl) return res.redirect(videoUrl)
        res.status(400).send("Incorrect Url or Requested Data.")
      })
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
})

module.exports = router;
