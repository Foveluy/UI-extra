import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Cover, Shit } from '../'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

configure({ adapter: new Adapter() })

describe('一个测试', () => {
  const CoverElement = <Cover>{getRef => <h1 ref={getRef}>哈哈哈</h1>}</Cover>
  const NotActiveCoverElement = <Cover isActive={false}>{getRef => <h1 ref={getRef}>哈哈哈</h1>}</Cover>

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(CoverElement, div)
  })

  it('default render with `isActive = true`', () => {
    const wrapper = mount(CoverElement)
    const cov = wrapper.find('.ui-extra-cover')
    const style = cov.getDOMNode().style
    expect(style.opacity).equal('0.75')
    expect(style['z-index']).equal('1000')
  })

  it(' render with `isActive = false`', () => {
    const wrapper = mount(NotActiveCoverElement)
    const cov = wrapper.find('.ui-extra-cover')
    const style = cov.getDOMNode().style
    expect(style.opacity).equal('0')
    expect(style['z-index']).equal('-1000')
    // console.log(wrapper.instance().state)
  })

  it(' when `isActive = false`,do not fire event; `isActive = true` fire', () => {
    let a = 1
    const handle = () => {
      a++
    }
    const wrapper = mount(
      <Cover isActive={false} onClick={handle}>
        {getRef => <h1 ref={getRef}>哈哈哈</h1>}
      </Cover>
    )
    const cov = wrapper.find('.ui-extra-cover')
    cov.simulate('click')
    expect(a).equal(1)

    const wrapper2 = mount(
      <Cover isActive={true} onClick={handle}>
        {getRef => <h1 ref={getRef}>哈哈哈</h1>}
      </Cover>
    )
    const cov2 = wrapper2.find('.ui-extra-cover')
    cov2.simulate('click')
    expect(a).equal(2)
  })

  it('render when update && when button click', () => {
    const wrapper = mount(<Shit />)
    wrapper.instance().setState({
      isActive: true
    })
    const cov = wrapper.find('.ui-extra-cover')
    const style = cov.getDOMNode().style
    expect(style.opacity).equal('0.75')
    expect(style['z-index']).equal('1000')

    const button = wrapper.find('#test-button')
    button.simulate('click')
    expect(style.opacity).equal('0')
    expect(style['z-index']).equal('-1000')

  })
})
