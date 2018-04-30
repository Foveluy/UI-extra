import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Cover } from './cover'

export class Shit extends React.Component {
  state = {
    isActive: true,
    activeIndex: 0
  }

  handleOnClick = () => {
    let index = this.state.activeIndex + 1

    console.log(index)
    this.setState({
      activeIndex: index % 3
    })
  }

  render() {
    return (
      <div>
        <Cover onClick={this.handleOnClick} isActive={this.state.isActive} activeIndex={this.state.activeIndex}>
          {getRef => (
            <div>
              <h1 ref={node => getRef(node, 1)} style={{ width: 200 }}>
                哈哈哈
              </h1>
              <h2 ref={node => getRef(node, 2)} style={{ width: 100 }}>
                哈哈哈
              </h2>
              <h2 ref={node => getRef(node, 3)} style={{ width: 100, right: 0, float: 'right' }}>
                哈哈哈
              </h2>
            </div>
          )}
        </Cover>
        <button id="test-button" onClick={this.handleOnClick}>
          查看
        </button>
      </div>
    )
  }
}

ReactDOM.render(<Shit />, document.getElementById('root'))
