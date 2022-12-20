import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Login from './Login'

class CommentWriter extends React.Component {
  constructor(props) {
    super(props)

    this.form = React.createRef();

    this.state = {
      logInToComment: false
    }

    this.formIsSubmitting = this.formIsSubmitting.bind(this)
    this.submitComment = this.submitComment.bind(this)
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

  async submitComment(user) {
    const { data } = await axios.post(`/api/papers/${this.props.match.params.id}/comments`, {
      text: this.form.current.text.value,
      userId: user.id
    })
  }

  render() {
    return (
      <div className='comment-writer'>
        <form onSubmit={this.formIsSubmitting} ref={this.form}>
          { this.props.user
            ? <div className="userName">{this.props.user.name}</div>
            : null
          }
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

export default connect(mapState)(withRouter(CommentWriter))
