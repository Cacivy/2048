import React from 'react'
import Enzyme, { mount } from 'enzyme'
import SquareList from './SquareList'
import Adapter from 'enzyme-adapter-react-16'
import Store, {MoveType} from '../model/store'

Enzyme.configure({ adapter: new Adapter() })

const store = Store.create( { list: [] })
store.init()

describe('SquareList Component', () => {
  store.setValueByXY(0, 0, 2)
  store.setValueByXY(1, 0, 2)
  store.setValueByXY(2, 0, 4)
  const wrapper = mount(
    <SquareList list={store.list} onMove={store.move} />
  )

  it('square count', () => {
    let $td = wrapper.find('td')
    expect($td.length).toBe(store.list.length)
  })

  it('move', () => {
    store.move(MoveType.left)
    expect(store.getItemByXY(0, 0).value).toBe(4)
    expect(store.getItemByXY(1, 0).value).toBe(4)
  })


})