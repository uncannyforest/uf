import React from 'react'
import { connect } from 'react-redux'

import { logInUser } from '../store/auth'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.state = {
      register: false
    }

    this.formIsSubmitting = this.formIsSubmitting.bind(this)
  }

  componentDidMount() {
    this.form.current.email.focus()
  }

  formIsSubmitting(e) {
    e.preventDefault()
    this.props.logInUser({
      email: e.target.email.value,
      password: e.target.password.value
    }, this.props.then)
  }

  render () {
    return (
      <div className='login'>
        <div className='instructions'>{this.props.instructions}</div>
        <form onSubmit={this.formIsSubmitting} ref={this.form}>
          <div className='labeled-input'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' />
          </div>
          <div className='labeled-input'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' />
          </div>
          {this.state.register ? <div className='labeled-input'>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' />
          </div> : null}
          <button type='submit'>
            {this.props.and ? `Log in and ${this.props.and}` : 'Log in'}
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  logInUser: (creds, thenDo) => dispatch(logInUser(creds, thenDo))
})

export default connect(null, mapDispatch)(Login)
