const tumblr = require('tumblr.js');

const client = tumblr.createClient({
  credentials: { consumer_key: process.env.TUMBLR_CONSUMER_KEY },
  returnPromises: true
});

const UF = 'uncannyforest'

const cache = {}

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
  cache[tag] = entry

  console.log(`Updated cache tag ${tag}:`, entry)
}

const summarizePostData = (tag) => (post) => {
  return {
    id: post.id_string,
    url: `${post.post_url}?tag=${tag}`,
    timestamp: post.timestamp,
    summary: post.summary,
    notes: post.note_count
  }
}

const findPostsByTag = async (tag) => {
  let response = await client.blogPosts(UF, { tag })
  let posts = response.posts.map(summarizePostData(tag))
  if (response.total_posts > 20) {
    console.log(`Total posts for tag ${tag}:`, response.total_posts)
    for (let i = 20; i < response.total_posts; i += 20) {
      console.log('Getting posts starting at #', i)
      response = await client.blogPosts(UF, { tag: tag, offset: i })
      posts = posts.concat(response.posts.map(summarizePostData(tag)))
    }
  }
  return posts;
}

const getLatestPostByTag = async (tag) => {
  addToCache(tag, await findPostsByTag(tag))

  return cache[tag].newest
}

const getTagNavForPost = async (tag, postId) => {
  let result

  // refresh cache if tag missing
  if (!cache[tag]) {
    addToCache(tag, await findPostsByTag(tag))
    result = cache[tag].nav[postId]
  } else {
    const maybeResult = cache[tag].nav[postId]
    if (maybeResult && maybeResult.newer) result = maybeResult

    // refresh cache if post missing or newest
    addToCache(tag, await findPostsByTag(tag))
    result = cache[tag].nav[postId]
  }

  result.newest = cache[tag].newest
  result.oldest = cache[tag].oldest
  result.random = cache[tag].posts[Math.floor(Math.random() * cache[tag].posts.length)]
  return result
}

module.exports = {
  getLatestPostByTag,
  getTagNavForPost
}
