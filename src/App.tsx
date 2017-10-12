import React from 'react'
import styled from 'styled-components'
import { Header, Content } from './components'
import { observer } from 'mobx-react'
import Store from './model/'
import { applySnapshot, onSnapshot } from 'mobx-state-tree'

const store = Store.create({ list: [] })
store.init()

// Time travel
var states: any[] = []
var currentFrame = -1

onSnapshot(store, snapshot => {
  if (currentFrame === states.length - 1) {
    currentFrame++
    states.push(snapshot)
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

const StyledApp = styled(App)`
  width: 640px;
  margin: 0 auto;
  background: #abc;
`

export default StyledApp
