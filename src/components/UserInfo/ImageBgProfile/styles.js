import styled from 'styled-components'
import styles from '../../../styles'
import path from '../../../config/util'

export const ContainerImage = styled.div`
  margin-left: 300px;
  width: calc(100% - 300px);
  margin-bottom: 20px;
  
  .image-bg{
    img{
      width: 100%;
      max-width: 100%;
    }
    @media (max-width: ${styles.containerMiddle}) {
     display: none;
    }
  }
  .edit-image{
    color: #f8f8f8;
    float: right;
    margin: 10px 10px 0 0;
    font-size: 20px;
    cursor: pointer;

    &:before{
      content: 'Trocar imagem de fundo';
      opacity: 1;
      margin-right: 5px;
      font-size: 13px;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 3px 4px;
      transition: opacity 400ms linear;
    }

    &:hover:before{
      opacity: 1;
    }
  }
`

export const UserImgbackground = styled.div`
  background-repeat: no-repeat;
  background-size: contain, cover;
  /* background-position: center; */
  height:${props => props.visitProfile ? '480px' : '170px'};
  position:${props => props.visitProfile ? 'static' : 'absolute'};
  top: 0;
  left: 0;
  width:100%;
  box-shadow: 1px 1px 15px #ccc;
  cursor: pointer;

  ${props => props.imageBackground
    ? `background-image: url(${props.imageBackground});`
    : `background-color: rgba(0, 0, 0, 0.3);
      background-image: url('${path.pathImageDev}/default-background.svg');
      @media (max-width: ${styles.containerMiddle}) {
        background-image:none;
      }`
  }
  ${props => props.visitProfile && !props.imageBackground &&
    `background: url('${path.pathImageDev}/default-background.svg');
     background-color: rgba(0, 0, 0, 0.3);
      @media (max-width: ${styles.containerMiddle}) {
        display: none;
      }
  `}

  @media (max-width: ${styles.containerMiddle}) {
      background-position-y: -60px;
      height:220px;
      background-size: 600px ;
  }
  @media (min-width: 620px) {
      background-size: cover ;
  }

`