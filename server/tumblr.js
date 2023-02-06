const tumblr = require('tumblr.js');

const client = tumblr.createClient({
  credentials: { consumer_key: process.env.TUMBLR_CONSUMER_KEY },
  returnPromises: true
});

const UF = 'uncannyforest'

const postCache = {}

const addToCache = (tag, posts) => {
  let newer = posts[0]
  const entry = {
    posts: posts,
    newest: posts[0],
    nav: {
      [newer.id]: {}
    }
  }
  for (let i = 1; i < posts.length; i++) {
    const older = posts[i]
    entry.nav[newer.id].older = older
    entry.nav[older.id] = {
      newer: newer
    }
    newer = older
  }
  entry.oldest = newer
  postCache[tag] = entry

  console.log(`Updated cache tag ${tag}:`, entry)
}

const summarizePostData = (post) => {
  return {
    id: post.id_string,
    url: post.post_url,
    timestamp: post.timestamp,
    summary: post.summary,
    notes: post.note_count
  }
}

const findPostsByTag = async (tag) => {
  let response = await client.blogPosts(UF, { tag })
  const posts = response.posts.map(summarizePostData)
  if (response.total_posts > 20) {
    for (let i = 20; i < response.total_posts; i++) {
      response = await client.blogPosts(UF, { tag: tag, offset: i })
      posts = posts.concat(response.posts.map(summarizePostData))
    }
  }
  return posts;
}

const getLatestPostByTag = async (tag) => {
  const posts = await findPostsByTag(tag)

  addToCache(tag, posts)

  return postCache[tag].newest
}

module.exports = {
  getLatestPostByTag
}
