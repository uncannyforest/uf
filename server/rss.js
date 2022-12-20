const express = require('express')
const router = express.Router()

const { desktop, mobile } = require('../lib/imagePaths')
const { uncannyforest, about } = require('./config')

// GET /rss
router.get('/', (req, res) => {
  res.type('application/xml').send(genFeed(false))
})

// GET /rss/mobile
router.get('/mobile', (req, res) => {
  res.type('application/xml').send(genFeed(true))
})

const genFeed = (mobileView) => {
  const posts = uncannyforest.getComics()
    .map((comic, index) => genPostXml(comic, index, mobileView)).reverse().join('')

  return (
`<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0">
  <channel>
  <title>Uncanny Forest</title>
  <description>
    ${about.oneline}
  </description>
  <link>https://uncannyforest.com/</link>${posts}
  </channel>
</rss>
`)
}

const genPostXml = (comic, index, mobileView) => {
  let description
  if (mobileView) {
    description = mobile(index, comic.panels).map(panel => `
        &lt;img src="https://uncannyforest.com/${panel}"&gt;`).join('')
  } else {
    description = `
        &lt;img src="https://uncannyforest.com/${desktop(index)}"&gt;`
  }

  return `
    <item>
      <title>
        ${comic.title}
      </title>
      <link>
        http://uncannyforest.com/${index}
      </link>
      <guid>
        c/${index}
      </guid>
      <pubDate>${comic.date.toUTCString()}</pubDate>
      <description>${description}
      </description>
    </item>`
}

module.exports = router
