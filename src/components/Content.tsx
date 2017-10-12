import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { SquareList, Controller } from './'

interface ContentProps {
  className?: string
  list: any
  onReset: () => void
  onPrev: () => void
  onMove: (keyCode: number) => void
}
@observer
class Content extends Component<ContentProps> {
  render() {
    return (
      <div className={this.props.className}>
        <Controller onPrev={this.props.onPrev} onReset={this.props.onReset} />
        <SquareList list={this.props.list} onMove={this.props.onMove} />
      </div>
    )
  }
}
const StyledContent = styled(Content)`
  padding: 20px;
  overflow: hidden;
`

export default StyledContent
