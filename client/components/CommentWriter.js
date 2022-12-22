import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Login from './Login'
import { logOutUser } from '../store/auth'
import { postComment } from '../store/commentary'

class CommentWriter extends React.Component {
  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.state = {
      logInAtDisplayName: false,
      logInToComment: false
    }

    this.formIsSubmitting = this.formIsSubmitting.bind(this)
    this.submitComment = this.submitComment.bind(this)
    this.logInAtDisplayName = this.logInAtDisplayName.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  async formIsSubmitting(e) {
    e.preventDefault()
    if (this.props.user) {
      this.submitComment(this.props.user)
    } else {
      this.setState({
        logInAndComment: true
      })
    }
  }

  submitComment(user) {
    return this.props.postComment({
      text: this.form.current.text.value,
      userId: user.id,
      paperId: this.props.match.params.id
    })
  }

  logInAtDisplayName(e) {
    e.preventDefault()
    this.setState({
      logInAtDisplayName: true
    })
  }

  logOut(e) {
    e.preventDefault()
    this.setState({
      logInAtDisplayName: false
    })
    this.props.logOutUser()
  }

  render() {
    return (
      <div className='comment-writer'>
        <div className='user-name-area'>
        { this.props.user
          ? <><div className='user-name'>{this.props.user.name}</div>
              <div className='log-in'><a href='#' onClick={this.logOut}>Log out</a></div></>
          : this.state.logInAtDisplayName
          ? <Login instructions='Enter an email and password to log in.' />
          : <div className='log-in'><a href='#' onClick={this.logInAtDisplayName}>Log in for display name</a></div>
        }
        </div>
        <form onSubmit={this.formIsSubmitting} ref={this.form}>
          <div className='textarea'>
            <textarea id='text' name='text' rows='3' />
          </div>
          {this.state.logInAndComment ? null : <button type='submit' className='comment-button'>Comment</button>}
        </form>
        {this.state.logInAndComment
          ? <Login and='comment' then={this.submitComment}
              instructions='Enter an email and password to log in and post your comment.' />
          : null}
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.auth.user
})

const mapDispatch = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
  postComment: (comment) => dispatch(postComment(comment))
})

export default connect(mapState, mapDispatch)(withRouter(CommentWriter))
