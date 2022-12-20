import axios from 'axios'
import React from 'react'

import Comment from './Comment'
import CommentWriter from './CommentWriter'

class Commentary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      commentsById: {},
      topLevelComments: []
    }
  }

  async update() {
    const { data } = await axios.get(`/api/papers/${this.props.match.params.id}/comments`)
    const commentsById = {}
    const topLevelComments = []
    data.forEach((comment) => {
      commentsById[comment.id] = comment
      comment.children = []
    })
    data.forEach((comment) => {
      if (comment.parentId)
        commentsById[comment.parentId].children.push(comment)
      else
        topLevelComments.push(comment)
    })
    this.setState({ commentsById, topLevelComments })
  }

  componentDidMount() { return this.update(); }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id)
      return this.update()
  }

  render() {
    return (
      <div className="plains">
        <a name="commentary" />
        <div className="forest-boundary">
          <img src="/images/flashlight-on-2x.png" className="hf"/>
            <CommentWriter />
            <div className="comments">
              {this.state.topLevelComments.map(comment => <Comment key={comment.id} data={comment} />)}
            </div>
          <img src="/images/grass-floor-2x.png" className="hf" />
        </div>
      </div>
    )
  }
}

export default Commentary
