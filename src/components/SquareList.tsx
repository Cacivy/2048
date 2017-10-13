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
  node: HTMLDivElement
  componentDidMount() {
    // if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
      let startX: number, startY: number, moveEndX, moveEndY, X, Y
      this.node.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX
        startY = e.touches[0].pageY
      })
      let moving = false
      this.node.addEventListener('touchmove', e => {
        e.preventDefault()
        if (moving) {
          return
        }
        moving = true
        moveEndX = e.changedTouches[0].pageX
        moveEndY = e.changedTouches[0].pageY
        X = moveEndX - startX
        Y = moveEndY - startY

        let isX = Math.abs(X) - Math.abs(Y) > 0
        let moveType: MoveType | undefined

        if (isX) {
          moveType = X > 0 ? MoveType.right : MoveType.left
        } else {
          moveType = Y > 0 ? MoveType.down : MoveType.up
        }

        if (moveType) {
          this.props.onMove(moveType)
        }
        
        setTimeout(() => {
          moving = false
        }, 300)
      })
    // } else {
      document.body.addEventListener('keydown', this.onKeyDown)
    // }
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
      <div className={this.props.className} ref={node => this.node = node as HTMLDivElement}>
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
