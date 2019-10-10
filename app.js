const express = require('express')
const app = express()
const request = require('request')

const api = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&key=AIzaSyDzdwSsJFG8tD8wmAQTKpZDBndfUm8DDxs&id="

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/songs', (req, res) => {
  request.get({
    url: api + req.query.id,
    headers: {
      'Content-Type': 'application/json'
    }
  }, (error, response, body) => {
    if (response.statusCode == 200) {
      const jsonBody = JSON.parse(body).items[0]
      res.render('home', {
        songTitle: jsonBody.snippet.title + ' - ' + jsonBody.snippet.channelTitle,
        songDescription: jsonBody.snippet.description,
        songThumbnail: jsonBody.snippet.thumbnails.high.url,
        id : jsonBody.id,
        title: jsonBody.snippet.title,
        channel: jsonBody.snippet.channelTitle,
        linkThumbnail: jsonBody.snippet.thumbnails.medium.url,
        duration: jsonBody.contentDetails.duration
      })
    } else {
      res.send('Muzic - Music every where')
    }
  })
})

app.listen(process.env.PORT || 3000)