import React, { Component } from 'react'

class Input extends Component {
  constructor () {
    super()
    this.state = {
      number: ''
    }
  }

  handleChange (e) {
    this.setState({
      number: e.target.value
    }, 
  () => {
    if(this.props.onSubmit) {
      const {number} = this.state
      this.props.onSubmit({number})
    }
  })
  }

  render () {
    return (
      <div>
        <input 
          type='number'
          onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

class PercentageShower extends Component {
  render () {
    return (
      <div>
        {this.props.number}
      </div>
    )
  }
}

class PercentageApp extends Component {
  constructor () {
    super()
    this.state = {
      number: ''
    }
  }

  numHandler(number) {
    this.setState({number})
  }

  render () {
    return (
      <div>
        <Input onSubmit={this.numHandler.bind(this)}/>
        <PercentageShower number={this.state.number}/>
      </div>
    )
  }
}

export default PercentageApp