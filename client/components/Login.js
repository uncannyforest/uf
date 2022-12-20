import React from 'react';
import { connect } from 'react-redux';

import { logInUser } from '../store/auth'

class Login extends React.Component {
  render () {
    return (
      <div className='login'>
        <div className='instructions'>{this.props.instructions}</div>
        <form>
          <label htmlFor='email'>Email:</label>
          <input type='text' name='email' />
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' />
          {this.state.register ? <>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' />
          </> : null}
          <button type='submit'>{this.props.submitText || 'Log in'}</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  logInUser: (creds) => dispatch(logInUser(creds))
});

export default connect(null, mapDispatch)(Login);
