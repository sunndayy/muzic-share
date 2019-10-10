const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})
 
app.listen(process.env.PORT || 3000)