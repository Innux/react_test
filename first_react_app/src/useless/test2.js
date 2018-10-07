const users = []

class User extends Component {
  render () {
    const { user } = this.props
    return (
      <div>
        <div>name: {user.name}</div>
        <div>age: {user.age}</div>
        <hr/>
      </div>
    )
  }
}

class Index extends Component {
  render () {
    return (
      <div>
        {users.map((user, i) => <User key={i} user={user}/>)}
      </div>
    )
  }
}