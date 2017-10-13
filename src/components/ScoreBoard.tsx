import React, { Component } from 'react'
import styled from 'styled-components'
import { Text } from '../utils/'

const Score = styled.span`
font-weight: bold;
`

interface ScoreBoardProps {
  className?: string
  score: number
  best: number
}
class ScoreBoard extends Component<ScoreBoardProps> {
  render() {
    const { className, score, best } = this.props
    let noRecord = Text.noRecord
    return (
      <div className={className}>
        {Text.score} : <Score>{score || noRecord}</Score>
        <br />
        {Text.best} : <Score>{best || noRecord}</Score>
      </div>
    )
  }
}

const StyledScoreBoard = styled(ScoreBoard)`
  float: right;
  width: 100px;
  color: #F67C5F;
  line-height: 30px;
  text-align: left;
`

export default StyledScoreBoard
