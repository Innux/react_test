class LikeButton extends Component {
  static defaultProps = {
    likedText: 'cancel',
    unlikedText: 'like'
  }

  constructor () {
    super()
    this.state = {
      isLiked: false
    }
  }

  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked
          ? this.props.likedtext
          : this.props.unlikedText}
      </button>
    )
  }
}