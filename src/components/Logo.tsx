import styled, { keyframes } from 'styled-components'
const logo = require('../assets/images/logo.svg')

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

const Logo = styled.img.attrs({
  src: logo,
  alt: 'logo'
})`
  float: left;
  height: 60px;
  animation: ${rotate360} infinite 20s linear;
`

export default Logo
