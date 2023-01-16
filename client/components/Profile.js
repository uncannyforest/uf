import React from 'react'
import { connect } from 'react-redux'

import { loadLoginState, updateUser } from '../store/auth'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.formIsSubmitting = this.formIsSubmitting.bind(this)
  }

  componentDidMount() {
    this.props.loadLoginState();
  }

  formIsSubmitting(e) {
    e.preventDefault()

    this.props.updateUser({
      name: this.form.current['display-name'].value,
      url: this.form.current.url.value
    })
  }

  render() {
    if (!this.props.user) return <div></div>;

    return (
      <div className='form-page'>
        <form onSubmit={this.formIsSubmitting} ref={this.form}>
          <div className='row'>
            <div className='labeled-input'>
              <label htmlFor='email'>Email</label>
              <input type='text' name='email' disabled defaultValue={this.props.user.email} />
            </div>
          </div>
          <div className='row'>
            <div className='labeled-input'>
              <label htmlFor='name'>Display name:</label>
              <input type='text' name='name' id='display-name' defaultValue={this.props.user.name} />
            </div>
          </div>
          <div className='row'>
            <div className='labeled-input'>
              <label htmlFor='url'>Make display name link to URL:</label>
              <input type='text' name='name' id='url' defaultValue={this.props.user.url} />
            </div>
          </div>
          <button type='submit' id='save'>Save</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.auth.user
})

const mapDispatch = (dispatch) => ({
  loadLoginState: () => dispatch(loadLoginState()),
  updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapState, mapDispatch)(Profile)
