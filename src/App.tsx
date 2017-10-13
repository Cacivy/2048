import React from 'react'
import styled from 'styled-components'
import { Header, Content } from './components'
import { observer } from 'mobx-react'
import { store, previousState } from './model/'

interface AppProps {
  className?: string
}
@observer
class App extends React.Component<AppProps> {
  render() {
    return (
      <div className={this.props.className}>
        <Header score={store.score} best={store.best} />
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
  background: #F7F7F0;
`

export default StyledApp
