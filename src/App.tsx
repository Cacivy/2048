import React from 'react'
import styled from 'styled-components'
import { Header, Content } from './components'
import { observer } from 'mobx-react'
import Store from './model/'
import { applySnapshot, onSnapshot } from 'mobx-state-tree'

const local = localStorage.getItem('store')
const initData = local ? JSON.parse(local) : { list: [] }
const store = Store.create(initData)
if (!local) {
  store.init()
}


// Time travel
var states: any[] = []
var currentFrame = -1

onSnapshot(store, snapshot => {
  if (currentFrame === states.length - 1) {
    currentFrame++
    states.push(snapshot)
    localStorage.setItem('store', JSON.stringify(snapshot))
  }
})

const previousState = () => {
  if (currentFrame === 0) return
  currentFrame--
  applySnapshot(store, states[currentFrame])
  states.splice(currentFrame, 1)
}

interface AppProps {
  className?: string
}
@observer
class App extends React.Component<AppProps> {
  render() {
    return (
      <div className={this.props.className}>
        <Header score={store.score} />
        <Content
          list={store.list}
          onPrev={previousState}
          onReset={store.init}
          onMove={store.move}
        />
      </div>
    )
  }
}

let width = window.innerWidth
const StyledApp = styled(App)`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: ${width > 640 ? 640 : width}px;
  min-height: 100%;
  margin: 0 auto;
  background: #abc;
`

export default StyledApp
