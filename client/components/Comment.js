import React from 'react'

import CommentWriter from './CommentWriter'

class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reply: false
    }

    this.toggleReply = this.toggleReply.bind(this)
    this.clearReply = this.clearReply.bind(this)
  }

  toggleReply(e) {
    e.preventDefault()

    this.setState({
      reply: !this.state.reply
    })
  }

  clearReply() {
    this.setState({
      reply: false
    })
  }

  render () {
    return (
      <div className='comment'>
        <div className='comment-body'>
          <div className='user-name'>
            { this.props.data.user.url
              ? <a href={this.props.data.user.url}>{this.props.data.user.name}</a>
              : this.props.data.user.name }
          </div>
          <div className='comment-text'>{ this.props.data.text }</div>
          <div className='responses'><a href='#' onClick={this.toggleReply}>Reply</a></div>
        </div>
        <div className='children'>
          { this.state.reply ? <CommentWriter parent={this.props.data.id} onSubmit={this.clearReply} /> : null }
          { this.props.data.children.map(comment => <Comment key={comment.id} data={comment} />) }
        </div>
      </div>
    )
  }
}

export default Comment
