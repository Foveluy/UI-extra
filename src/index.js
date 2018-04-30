import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Cover } from './cover'

export class Shit extends React.Component {
  state = {
    isActive: false
  }

  handleOnClick = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    return (
      <div>
        <Cover onClick={this.handleOnClick} isActive={this.state.isActive}>
          {getRef => <h1 ref={getRef}>哈哈哈</h1>}
        </Cover>
        <button id="test-button" onClick={this.handleOnClick}>
          查看
        </button>
      </div>
    )
  }
}

ReactDOM.render(<Shit />, document.getElementById('root'))
