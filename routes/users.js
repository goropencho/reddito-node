var express = require('express');
var router = express.Router();
var axios = require('axios')
var _ = require('lodash')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function formatUrl(url){
  if(url.endsWith(".json")) return url
  if(url.endsWith("/")){
    url = url.slice(0,-1)
    url = url + ".json"
    return url
  }

}


router.get('/url', function(req, res){
  let urls = req.query.url
  let formattedUrl = formatUrl(urls);

  let config = {
    Headers: {
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0"
    }
  }

  return axios.get(formattedUrl, config)
    .then(resp => {
      debugger
      let repsonse = resp.data;
      let videoUrl = _.get(repsonse, "0.data.children.0.data.secure_media.reddit_video.fallback_url")
      return res.redirect(videoUrl)
    })
    .catch(err => {
      console.error(err);
      throw new "Some error"
    })
})

module.exports = router;
