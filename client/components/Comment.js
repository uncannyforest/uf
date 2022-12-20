import React from 'react'

import CommentWriter from './CommentWriter'

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="commentBody">
        <div className="userName">
          { props.data.user.url
            ? <a href={props.data.user.url}>{props.data.user.name}</a>
            : props.data.user.name }
        </div>
        <div className="commentText">{ props.data.text }</div>
      </div>
      <div className="children">
        { props.data.children.map(comment => <Comment key={comment.id} data={comment} />) }
      </div>
    </div>
  )
}

export default Comment
