import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Text } from '../utils/'

const Button = styled.button`
  border: none;
  width 50px;
  padding: 10px 0;
  background: #EEE4DA;
  color: #776E65;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.18), 0 1px 5px 0 rgba(0,0,0,.15);
  margin-left: 8px;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  transition: box-shadow .4s ease-out,-webkit-box-shadow .4s ease-out;

  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    background: #EDE0C8;
  }
`
interface ContollerProps {
  className?: string
  onReset: () => void
  onPrev: () => void
}
@observer
class Contoller extends Component<ContollerProps> {
  render() {
    const { className } = this.props
    return (
      <div className={className}>
        <Button onClick={this.props.onPrev}>{Text.undo}</Button>
        <Button onClick={this.props.onReset}>{Text.reset}</Button>
      </div>
    )
  }
}

const StyledContoller = styled(Contoller)`
  width: 120px;
  margin: 0 auto 20px auto;
`

export default StyledContoller
