const axios = require('axios')
const express = require('express')
const xml2js = require('xml2js')

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

// GET /rss/blog/:tag
router.get('/blog/:tag', async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://blog.uncannyforest.com/tagged/${req.params.tag}/rss`)
    const feed = await xml2js.parseStringPromise(data)

    for (let item of feed.rss.channel[0].item) {
      const description = item.description[0]

      // add title
      let titleFirstPart = item.category[0]
      let titleSecondPart
      let pb = description.indexOf('<p><b>') + '<p><b>'.length
      if (description.indexOf('<p><b>') !== -1 && description.indexOf('</b></p>', pb) !== -1)
        titleSecondPart = description.substring(pb, description.indexOf('</b></p>', pb))
      else {
        const pStart = description.indexOf('<p>') + '<p>'.length
        const pEnd = description.indexOf('<', pStart)
        const firstParagraph = description.substring(pStart, pEnd)
        if (firstParagraph.length <= 48) titleSecondPart = firstParagraph
        else titleSecondPart = firstParagraph.substring(0, firstParagraph.lastIndexOf(' ', 48)) + ' ...'
      }
      item.title = `${titleFirstPart}: ${titleSecondPart}`

      // fix description whitespace
      item.description[0] = description.replaceAll(/ (?= )/g, '&nbsp;')
    }

    res.send(new xml2js.Builder().buildObject(feed))
  } catch (e) {
    next(e)
  }
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
