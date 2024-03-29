import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'

import Comment from './Comment'
import CommentWriter from './CommentWriter'
import { loadComments } from '../store/commentary'

class Commentary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: null
    }
  }

  componentDidMount() {
    this.props.loadComments(this.props.getComicId())
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getComicId() !== this.props.getComicId())
      this.props.loadComments(this.props.getComicId())
  }

  toggleComments(on) {
    return ((e) => {
      if (!on) e.preventDefault();
      this.setState({ showComments: on })
    }).bind(this)
  }

  render() {
    let noComments = this.props.topLevelComments.length === 0;

    if (noComments && !this.state.showComments || this.state.showComments === false) {
      return (
        <>
          <a name='commentary' />
          <div className='plains'>
            <a href='#commentary' onClick={this.toggleComments(true)}>
              <div className='commentary-off'>
                <img src={`/images/commentary-${noComments ? 'write' : 'show'}-2x.png`} className='flashlight-off-msg'/>
                <img src='/images/flashlight-off-2x.png' className='flashlight-off'/>
              </div>
            </a>
          </div>
        </>
      )
    }

    return (
      <>
        <a name='commentary' />
        <div className='plains'>
          <div className='forest-boundary'>
            <a href='#' onClick={this.toggleComments(false)}>
              <img src='/images/flashlight-on-2x.png' className='hf'/>
            </a>
            <CommentWriter paperId={this.props.getComicId()} />
            <div className='comments'>
              {this.props.topLevelComments.map(comment => <Comment key={comment.id} data={comment} />)}
            </div>
            <img src='/images/grass-floor-2x.png' className='hf' />
          </div>
        </div>
      </>
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
