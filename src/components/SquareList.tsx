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
  componentDidMount() {
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
      let startX: number, startY: number, moveEndX, moveEndY, X, Y
      document.body.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX
        startY = e.touches[0].pageY
      })
      let startTime = Date.now()
      document.body.addEventListener('touchmove', e => {
        e.preventDefault()
        let newTime = Date.now()
        if (newTime - startTime < 300) {
          return
        }
        startTime = newTime
        moveEndX = e.changedTouches[0].pageX
        moveEndY = e.changedTouches[0].pageY
        X = moveEndX - startX
        Y = moveEndY - startY
        if (X > 0) {
          this.props.onMove(MoveType.right)
        } else if (X < 0) {
          this.props.onMove(MoveType.left)
        } else if (Y > 0) {
          this.props.onMove(MoveType.down)
        } else if (Y < 0) {
          this.props.onMove(MoveType.up)
        }
      })
    } else {
      document.body.addEventListener('keydown', this.onKeyDown)
    }
  }

  componentWillUnmount() {
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    } else {
      document.body.removeEventListener('keydown', this.onKeyDown)
    }
  }

  onKeyDown = (ev: KeyboardEvent) => {
    if (MoveType[ev.keyCode]) {
      ev.preventDefault()
    }

    this.props.onMove(ev.keyCode)
  }

  render() {
    return (
      <div className={this.props.className}>
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
let width = window.innerWidth - 40
const StyledSquareList = styled(SquareList)`
  width: ${width > 416 ? 416 : width}px;
  margin: 0 auto;
  word-spacing: -6px;
`
export default StyledSquareList
