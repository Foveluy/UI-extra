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
    // cover.style.width = targetWidth + 'px'
    // cover.style.height = targetHeight + 'px'
    // cover.style.borderWidth =
    //   offsetTop +
    //   'px ' +
    //   (pageWidth - targetWidth - offsetLeft) +
    //   'px ' +
    //   (pageHeight - targetHeight - offsetTop) +
    //   'px ' +
    //   offsetLeft +
    //   'px'

    // cover.style.display = 'block'
    // cover.style.opacity = '.75'
    // cover.style.zIndex = '1000'
    return {
      width: targetWidth,
      height: targetHeight,
      display: 'block',
      opacity: 0.75,
      zIndex: 1000,
      borderWidth:
        offsetTop +
        'px ' +
        (pageWidth - targetWidth - offsetLeft) +
        'px ' +
        (pageHeight - targetHeight - offsetTop) +
        'px ' +
        offsetLeft +
        'px'
    }
  }
}

export class Cover extends React.Component {
  constructor(props) {
    super(props)
    const win = window
    this.state = {
      width: win.innerWidth,
      height: win.innerHeight,
      borderWidth: 0,
      display: 'block',
      position: 'absolute',
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
  }

  static defaultProps = {
    isActive: true
  }
  componentWillReceiveProps(nextProps) {
    const win = window
    const coverStyle = coverGuide(this.cover, this.arrElTarget[this.index])

    this.setState({
      ...coverStyle,
      opacity: nextProps.isActive ? 0.75 : 0,
      width: nextProps.isActive ? coverStyle.width : win.innerWidth,
      height: nextProps.isActive ? coverStyle.height : win.innerHeight,
      zIndex: nextProps.isActive ? 1000 : -1000,
      borderWidth: nextProps.isActive ? coverStyle.borderWidth : 0
    })
  }

  componentDidMount() {
    this.index = 0
    this.arrElTarget = [this.childRef]
    this.props.isActive &&
      this.setState({
        ...coverGuide(this.cover, this.arrElTarget[this.index])
      })
  }
  _insideClickHandle = e => {
    e.stopPropagation()

    if (this.props.isActive) this.props.onClick && this.props.onClick()
  }
  render() {
    const getRef = node => {
      this.childRef = node
    }

    return (
      <div>
        <div
          style={{ ...this.state }}
          className="ui-extra-cover"
          ref={node => (this.cover = node)}
          onClick={this._insideClickHandle}
        />
        {React.Children.only(this.props.children(getRef))}
      </div>
    )
  }
}

export class Shit extends React.Component {
  state = {
    isActive: false
  }

  handleOnClick = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }
  test = () => {
    console.log('asda')
  }

  render() {
    return (
      <div>
        <Cover onClick={this.handleOnClick} isActive={this.state.isActive}>
          {getRef => <h1 ref={getRef}>哈哈哈</h1>}
        </Cover>
        <button onClick={this.handleOnClick}>查看</button>
      </div>
    )
  }
}

// ReactDOM.render(<Shit />, document.getElementById('root'))
