import React from 'react'
import { connect } from 'react-redux'

import { logInUser, registerUser } from '../store/auth'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.state = {
      register: false
    }

    this.formIsSubmitting = this.formIsSubmitting.bind(this)
    this.showRegister = this.shouldShowRegister.bind(this)
  }

  componentDidMount() {
    this.form.current.email.focus()
  }

  componentDidUpdate(prevProps) {
    if (this.shouldShowRegister() && !this.shouldShowRegister(prevProps)) {
      this.form.current.name.focus()
    }
  }

  formIsSubmitting(e) {
    e.preventDefault()
    if (e.nativeEvent.submitter.id === 'log-in') {
      this.props.logInUser({
        email: e.target.email.value,
        password: e.target.password.value
      }, this.props.then)
    } else if (e.nativeEvent.submitter.id === 'register') {
      this.props.registerUser({
        email: e.target.email.value,
        password: e.target.password.value,
        name: e.target.name.value
      }, this.props.then)
    }
  }

  shouldShowRegister(props = this.props) {
    return props.error && props.error.status === 404
  }

  render () {
    return (
      <div className='login'>
        <form onSubmit={this.formIsSubmitting} ref={this.form}>
          <div className='instructions'>
            {this.props.instructions}
          </div>
          <div className='row'>
            <div className='labeled-input'>
              <label htmlFor='email'>Email</label>
              <input type='text' name='email' />
            </div>
            <div className='labeled-input'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' />
            </div>
            <button type='submit' id='log-in'>
              {this.props.and ? `Log in and ${this.props.and}` : 'Log in'}
            </button>
          </div>
          {this.shouldShowRegister() ? <>
            <div className='instructions'>
              Welcome, new user! Enter a display name to continue.
            </div>
            <div className='row'>
              <div className='labeled-input'>
                <label htmlFor='name'>Display name:</label>
                <input type='text' name='name' id='display-name' />
              </div>
              <button type='submit' id='register'>
                {this.props.and ? `Register and ${this.props.and}` : 'Register'}
              </button>
            </div>
          </> : null}
        </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  error: state.auth.error
})

const mapDispatch = (dispatch) => ({
  logInUser: (creds, thenDo) => dispatch(logInUser(creds, thenDo)),
  registerUser: (info, thenDo) => dispatch(registerUser(info, thenDo)),
})

export default connect(mapState, mapDispatch)(Login)
