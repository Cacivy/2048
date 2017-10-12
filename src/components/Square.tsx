import React, { Component } from 'react'
import styled from 'styled-components'

interface SquareProps {
  className?: string
  value: number
  x: number
  y: number
}
class Square extends Component<SquareProps> {
  render() {
    const { className, value } = this.props
    return (
      <div className={className}>
        <span>{value || ''}</span>
      </div>
    )
  }
}

const colorMap = {
  0: '#CCC0B3',
  2: '#EEE4DA',
  4: '#EDE0C8',
  8: '#F2B179',
  16: '#F49563',
  32: '#F49563',
  64: '#F55D37',
  128: '#EEE863',
  256: '#EDB04D',
  512: '#ECB04D',
  1024: '#EB9437',
  2048: '#EA7821'
}

const StyledSquare = styled(Square)`
  word-spacing: 0;
  background-color: ${props => colorMap[props.value] || '#EA7821'};
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 5px;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
`

export default StyledSquare
