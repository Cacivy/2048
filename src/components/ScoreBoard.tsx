import React, { Component } from 'react'
import styled from 'styled-components'

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
    return (
      <div className={className}>
        Score : <Score>{score || 'No Record'}</Score>
        <br />
        Best : <Score>{best || 'No Record'}</Score>
      </div>
    )
  }
}

const StyledScoreBoard = styled(ScoreBoard)`
  float: right;
  width: 150px;
  color: #fff;
  line-height: 30px;
  text-align: left;
`

export default StyledScoreBoard
