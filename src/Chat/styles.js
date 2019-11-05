import styled from 'styled-components'
import styles from '../styles'

export const App = styled.div`
  position: relative;
  width: 100%;
  z-index: 20;

  .show-chat{
    position: fixed;
    width: ${props => props.showChat ? '40px' : '50px'};
    height: ${props => props.showChat ? '40px' : '50px'};
    background: ${styles.colorPrimary};
    border-radius: 50%;
    font-size: ${props => props.showChat ? '20px' : '26px'};
    bottom: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    right: 10px;
    transition: transform 300ms;
    box-shadow: 0 0 10px #888;

    @media (max-width: ${styles.containerSmall + 'px'}) and (max-height: 800px) {
      z-index: 20;
      bottom: 15px;
    }

    @media (max-height: 700px) and (min-width: ${styles.containerSmall + 'px'}) {
      bottom: 470px;
    }
  }
  .show-chat.bottom{
    transform: translateY(530px);
    
    @media (max-width: ${styles.containerSmall + 'px'}) and (max-height: 800px) {
      transform: translateY(0px);
    }

    @media (max-height: 700px) and (min-width: ${styles.containerSmall + 'px'}) {
      transform: translateY(450px);
    }
  }
  .show-enter{
    transform: translateY(100%);
  }
  .show-enter-active{
    transition: transform 300ms;

    transform: translateY(0%);
  }
  .show-exit-active{
    transition: transform 300ms;
    transform: translateY(0%);
  }
  .show-exit{
    transition: transform 300ms;
    transform: translateY(100%);
  }
`
export const ChatContainer = styled.section`
  position: fixed;
  max-width:350px;
  right: 10px;
  bottom: 4px;
  box-shadow: 0 0 10px #999;
  border-radius: 6px;
  width: 100%;

  @media (max-width: ${styles.containerSmall + 'px'}) and (max-height: 800px) {
    max-width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .content-messages{
    position: relative;
    max-height:100%;
    height: 480px;
    overflow:hidden;
    width: 100%;

    @media (max-width: ${styles.containerSmall + 'px'}) and (max-height: 800px) {
      height: 90vh;
    }

    @media (max-height: 700px) and (min-width: ${styles.containerSmall + 'px'}) {
      height: 400px;
    }
  }
  
  .fade-enter{
    transform: translateX(-100%);
    opacity: 0;
  }
  .fade-enter-active{
    transition: transform 300ms ease-in;
    opacity:1;
    transform: translateX(0%);
  }
  .fade-exit-active{
    transition: transform 300ms ease-in;
    transition:opacity 300ms ease-in;
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit{
    opacity: 0;
    transition: transform 300ms ease-in;
    transform: translateX(-100%);
  }
`