const express = require('express')
const app = express()
const request = require('request')

const api = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&key=AIzaSyDzdwSsJFG8tD8wmAQTKpZDBndfUm8DDxs&id="

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

app.get('/songs', (req, res) => {
  request.get({
    url: api + req.query.id,
    headers: {
      'Content-Type': 'application/json'
    }
  }, (error, response, body) => {
    if (response) {
      if (response.statusCode == 200) {
        const jsonBody = JSON.parse(body).items[0]
        res.render('home', {
          songTitle: jsonBody.snippet.title + ' - ' + jsonBody.snippet.channelTitle,
          songDescription: jsonBody.snippet.description,
          songThumbnail: jsonBody.snippet.thumbnails.high.url,
          url: encodeURI('muzic://detail?id=' + jsonBody.id + '&title=' + jsonBody.snippet.title + '&channel=' + jsonBody.snippet.channelTitle + '&linkThumbnail=' + jsonBody.snippet.thumbnails.medium.url + '&duration=' + jsonBody.contentDetails.duration)
        })
      } else {
        // res.redirect('https://play.google.com/store/apps/details?id=vn.com.vng.zalopay')
      }
    } else {
      // res.redirect('https://play.google.com/store/apps/details?id=vn.com.vng.zalopay')
    }
  })
})

app.get('/', (req, res) => {
  // res.redirect('https://play.google.com/store/apps/details?id=vn.com.vng.zalopay')
})

app.listen(process.env.PORT || 10000)

var admin = require("firebase-admin");

var serviceAccount = require("/home/lap10930/AndroidStudioProjects/muzic-share/muzic-249604-firebase-adminsdk-2gink-f18f408a28.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://muzic-249604.firebaseio.com"
});