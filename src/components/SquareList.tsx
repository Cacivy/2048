import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Square } from './'
import { MoveType } from '../model/'

interface SquareModel {
  value: number
  x: number
  y: number
}

interface SquareListProps {
  className?: string
  list: SquareModel[]
  onMove: (keyCode: number) => void
}
@observer
class SquareList extends Component<SquareListProps> {
  componentDidMount () {
    document.body.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (ev: KeyboardEvent) => {
    if (MoveType[ev.keyCode]) {
      ev.preventDefault()
    }
    
    this.props.onMove(ev.keyCode)
  }

  render() {
    return (
      <div
        className={this.props.className}
        tabIndex={0}
      >
        <table>
          <tbody>
            {[0, 1, 2, 3].reverse().map(y => (
              <tr key={y}>
                {this.props.list.filter(item => item.y === y).map(item => (
                  <td key={item.x + '-' + item.y}>
                    <Square value={item.value} x={item.x} y={item.y} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
const StyledSquareList = styled(SquareList)`
  width: 416px;
  margin: 0 auto;
  word-spacing: -6px;
`
export default StyledSquareList
