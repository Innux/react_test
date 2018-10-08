import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {

  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  handleSubmitComment (comment) {
    const {comments} = this.state
    comments.push(comment)
    this.setState({
      comments
    })
  }

  render () {
    return (
      <div className="wrapper">
        <CommentInput 
          onSubmit={this.handleSubmitComment.bind(this)}/>
        <CommentList />
      </div>
    )
  }
}

export default CommentApp