import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({ adapter: new Adapter() })

describe('App Component', () => {
  it('app render', () => {
    const app = renderer.create(<App />).toJSON()
    expect(app).toMatchSnapshot()
  })
})
