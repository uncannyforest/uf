import React from 'react'

import CommentWriter from './CommentWriter'

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment-body">
        <div className="user-name">
          { props.data.user.url
            ? <a href={props.data.user.url}>{props.data.user.name}</a>
            : props.data.user.name }
        </div>
        <div className="comment-text">{ props.data.text }</div>
      </div>
      <div className="children">
        { props.data.children.map(comment => <Comment key={comment.id} data={comment} />) }
      </div>
    </div>
  )
}

export default Comment
