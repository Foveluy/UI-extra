import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

var coverGuide = function(cover, target) {
  var body = document.body,
    doc = document.documentElement
  if (cover && target) {
    // target size(width/height)
    var targetWidth = target.clientWidth,
      targetHeight = target.clientHeight

    // page size
    var pageHeight = doc.scrollHeight,
      pageWidth = doc.scrollWidth

    // offset of target
    var offsetTop = target.getBoundingClientRect().top + (body.scrollTop || doc.scrollTop),
      offsetLeft = target.getBoundingClientRect().left + (body.scrollLeft || doc.scrollLeft)

    // set size and border-width
    cover.style.width = targetWidth + 'px'
    cover.style.height = targetHeight + 'px'
    cover.style.borderWidth =
      offsetTop +
      'px ' +
      (pageWidth - targetWidth - offsetLeft) +
      'px ' +
      (pageHeight - targetHeight - offsetTop) +
      'px ' +
      offsetLeft +
      'px'

    cover.style.display = 'block'
    cover.style.opacity = '.75'
    cover.style.zIndex = '1000'
  }
}

class Cover extends React.Component {
  static defaultProps = {
    isActive: true
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive) {
      this.arrElTarget = [document.getElementById(this.props.hightLight)]
      coverGuide(this.cover, this.arrElTarget[0])
    }
  }

  componentDidMount() {
    this.index = 0
    this.arrElTarget = [document.getElementById(this.props.hightLight)]
    this.props.isActive && coverGuide(this.cover, this.arrElTarget[this.index])
  }
  render() {
    const coverStyle = {
      display: this.props.isActive ? 'block' : 'none',
      position: 'absolute',
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      border: '0 solid #000',
      opacity: 0,
      /* filter: alpha(opacity=75); */
      zIndex: -1000,
      /* 过渡效果 */
      transition: 'all .25s',
      /* 边缘闪动问题fix */
      boxShadow: '0 0 0 100px #000',
      overflow: 'hidden'
    }

    console.log(this.props.children)
    return (
      <div>
        <div style={{ ...coverStyle }} ref={node => (this.cover = node)} onClick={this.props.onClick} />
        {React.Children.only(this.props.children)}
      </div>
    )
  }
}

class Shit extends React.Component {
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
        <Cover hightLight="i" isActive={this.state.isActive} onClick={this.handleOnClick}>
          <h1 id="i">哈哈哈</h1>
        </Cover>
        <button onClick={this.handleOnClick}>查看</button>
      </div>
    )
  }
}

ReactDOM.render(<Shit />, document.getElementById('root'))
