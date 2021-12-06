const express = require('express')
const port = 2137
const app = express()
const forge = require('node-forge')
const md5b64 = (msg) => forge.util.encode64(forge.md.md5.create().update(msg).digest().getBytes()).replaceAll('=', '')
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.set('views', './labs')
app.set('view engine', 'pug')

app.get('/deparam.js', function(req, res) {
  res.sendFile('node_modules/jquery-deparam/jquery-deparam.js', {root:__dirname});
});

app.get('/', (req, res, next) => {
  res.render('labs')
})

app.get('/fakeimgur', (req, res, next) => {
  res.render('fakeimgur', {})
})

app.get('/fakeimgur/:src', (req, res, next) => {
  res.render('fakeimgur', {
    src: decodeURIComponent(req.params.src).replaceAll(/[<|>]/g, '')
  })
})

app.get('/nopage', (req, res, next) => {
  res.render('nopage', {})
})

app.get('/nopage/:path', (req, res, next) => {
  res.render('nopage', {
    path: req.params.path
  })
})

const simpleDict = {}
app.get('/simple', (req, res, next) => {
  res.render('simple', {})
})

app.post('/simple', bodyParser.urlencoded({ extended: false }), (req, res, next) => {
  if (typeof req.body.url !== 'string') {
    res.render('simple', { error: true })
    return
  }
  const validUrl = req.body.url.replaceAll(/[<|>|'|"|`]/g, '')
  const validShort = md5b64(validUrl)
  simpleDict[validShort] = validUrl
  res.render('simple', { shortLink: `/simple/${validShort}` })
})

app.get('/simple/:short', (req, res, next) => {
  if (typeof simpleDict[req.params.short] === 'string') {
    res.render('simple', {
      script: `window.location.href="${simpleDict[req.params.short]}"`
    })
  } else res.render('simple', { error: true })
})

app.get('/rot13', (req, res, next) => {
  res.render('rot13', {})
})

app.get('/personalcard', (req, res, next) => {
  res.render('personalcard', {})
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
