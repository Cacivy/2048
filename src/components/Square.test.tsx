import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Square, { colorMap } from './Square'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })


describe('Square Component', () => {
  let value = 4
  const wrapper = mount(
    <Square value={value} x={1} y={0} />
  )

  let $square = wrapper.find('div')
  it('value', () => {
    expect($square.text()).toBe(value.toString())
  })
  it('style', () => {
    let style = $square.props().style
    if (style) {
      expect(style.backgroundColor).toBe(colorMap[value])
    }
  })
})