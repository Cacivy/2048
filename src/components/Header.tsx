import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Logo, ScoreBoard } from './'

const headerHeight = 60

interface HeaderProps {
  className?: string
  score: number
}
@observer
class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className={this.props.className}>
        <Logo />
        <ScoreBoard score={this.props.score} best={4096} />
      </div>
    )
  }
}

const StyledHeader = styled(Header)`
  padding: 20px;
  height: ${headerHeight}px;
  overflow: hidden;
  text-align: center;
  border-bottom: 1px solid #fff;
`

export default StyledHeader
