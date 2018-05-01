import React from 'react'
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

const getPopupPosition = (target, popupNode, position) => {
  const p = (l, t) => ({ left: l, top: t })

  const body = document.body,
    doc = document.documentElement

  const offsetTop = target.getBoundingClientRect().top + (body.scrollTop || doc.scrollTop),
    offsetLeft = target.getBoundingClientRect().left + (body.scrollLeft || doc.scrollLeft)

  if (position === 'bottom') {
    return p(offsetLeft, offsetTop + target.getBoundingClientRect().height + 3)
  }
  if (position === 'right') {
    return p(offsetLeft + target.getBoundingClientRect().width + 3, offsetTop)
  }

  if (position === 'top') {
    return p(offsetLeft, target.getBoundingClientRect().top - 3)
  }

  if (position === 'left') {
    return p(offsetLeft - popupNode.getBoundingClientRect().width - 3, offsetTop)
  }
}

export class Cover extends React.Component {
  constructor(props) {
    super(props)
    const win = window
    this.childRef = []
    this.PopupNode = React.createRef()

    this.cache = new Map()

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
    isActive: true,
    activeIndex: 0,
    popupPosition: 'bottom',
    popupElement: ''
  }
  componentWillReceiveProps(nextProps) {
    const win = window
    const coverStyle = coverGuide(this.cover, this.childRef[nextProps.activeIndex])
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
    this.props.isActive &&
      this.setState({
        ...coverGuide(this.cover, this.childRef[this.props.activeIndex])
      })
  }
  _insideClickHandle = e => {
    e.stopPropagation()
    //when modal layer is not active, we can not click it
    if (this.props.isActive) this.props.onClick && this.props.onClick()
  }

  _popup = () => {
    const _ref = this.childRef[this.props.activeIndex]
    if (_ref) {
      return getPopupPosition(_ref, this.PopupNode.current, this.props.popupPosition)
    }
  }

  render() {
    // getRefs from outside
    const getRef = (node, key) => {
      if (key === void 666) throw new Error('you need a unique key for `(node)=>getRef(node,key)`')
      if (!this.cache.get(key)) {
        this.childRef.push(node)
        this.cache.set(key, 1)
      }
    }
    return (
      <div>
        <div
          className="ui-extra-popup"
          style={{
            ...this._popup(),
            zIndex: 1002,
            display: this.props.isActive ? 'block' : 'none'
          }}
          ref={this.PopupNode}
        >
          {this.props.popupElement}
        </div>
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
