require('dotenv').config()

const cors = require('cors')
const express = require('express')
const fs = require('fs')
const { marked } = require('marked')
const morgan = require('morgan')
const path = require('path')
const { db } = require('./db')

const app = express()
app.use(morgan('dev'))
app.use(cors({ origin: [/\.uncannyforest\.com$/, /\.tumblr\.com$/, /\.txmblr\.com$/] }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', require('./api'))
app.use('/blog', require('./blog'))
app.use('/rss', require('./rss'))

if (fs.existsSync(path.join(__dirname, '..', 'purpose.md'))) {
  const html = fs.readFileSync(path.join(__dirname, '..', 'resources', 'plain.html'), 'utf8')
  const body = fs.readFileSync(path.join(__dirname, '..', 'purpose.md'), 'utf8') +
      '\n\n## [Go to root page](/welcome_home)\n'
  app.get('/', (req, res) => {
    res.send(html.replace('${body}', marked.parse(body)))
  })
}

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

const port = process.env.PORT || 3000

const start = async () => {
  await db.sync({ alter: true })
  app.listen(port, () => console.log(`Server up and running on port ${port}!`))
}

start()
