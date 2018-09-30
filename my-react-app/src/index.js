import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import 'antd/dist/antd.css';

class Title extends Component {
  render () {
    return (
      <h1>Title</h1>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <Title />
      </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
      <div>
        <h2>main....</h2>
      </div>
    )
  }
}

class Footer extends Component {
  render () {
    return (
      <div>
        <h2>footer...</h2>
      </div>
    )
  }
}

const NoStatus = (props) => {
  const sayHi = (event) => {
    console.log('hello')
  }
  return <div onClick={sayHi}>click</div>
}

class Index extends Component {
  render () {
    return (
      <div>
        <Header/>
        <Main/>
        <NoStatus/>
        <Footer/>
      </div>
    )
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));
