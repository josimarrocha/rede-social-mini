import styled from 'styled-components'
import styles from '../../../styles'

export const ContainerChat = styled.div`
  display:flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  left:0;
  top: 0;
  z-index: 10;

  .loader-mensagens{
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    z-index: 15;
  }
`

export const LineScroll = styled.div`
  max-width: 1060px;
  height: 30px;
  width: 100%;
  position: absolute;
  ${porps => porps.top ? `
    top: 0px;
  `: `
    bottom:100px;
  `
  }
  overflow: unset
`