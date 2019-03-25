import React from 'react'
import Enzyme, { mount } from 'enzyme'
import ScoreBoard from './ScoreBoard'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })


describe('Square Component', () => {
  let score = 0
  let best = 0
  const wrapper = mount(
    <ScoreBoard score={score} best={best} />
  )

  it('default value', () => {
    let $span = wrapper.find('span')
    expect($span.at(0).text()).toBe('NR')
  })

  it('change Value', () => {
    score = 99
    best = 100
    const newWrapper = mount(
      <ScoreBoard score={score} best={best} />
    )
      let $span = newWrapper.find('span')
      expect($span.at(0).text()).toBe(score.toString())
  })
})