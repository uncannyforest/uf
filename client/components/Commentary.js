import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'

import Comment from './Comment'
import CommentWriter from './CommentWriter'
import { loadComments } from '../store/commentary'

class Commentary extends React.Component {
  componentDidMount() {
    this.props.loadComments(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.props.loadComments(this.props.match.params.id)
  }

  render() {
    return (
      <div className="plains">
        <a name="commentary" />
        <div className="forest-boundary">
          <img src="/images/flashlight-on-2x.png" className="hf"/>
            <CommentWriter />
            <div className="comments">
              {this.props.topLevelComments.map(comment => <Comment key={comment.id} data={comment} />)}
            </div>
          <img src="/images/grass-floor-2x.png" className="hf" />
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  topLevelComments: state.commentary.topLevelComments
})

const mapDispatch = (dispatch) => ({
  loadComments: (paperId) => dispatch(loadComments(paperId))
})

export default connect(mapState, mapDispatch)(Commentary)
