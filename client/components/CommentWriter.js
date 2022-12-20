import React from 'react'
import { connect } from 'react-redux'

class CommentWriter extends React.Component {
  render() {
    return (
      <form>
        <div className='textarea'>
          <textarea id='text' name='text' rows='3' />
        </div>
        {this.props.hideSubmit ? null : <button type='submit'>Comment</button>}
      </form>
    )
  }
}

const mapState = (state) => ({
  user: state.auth.user
})

export default connect(mapState)(CommentWriter)
