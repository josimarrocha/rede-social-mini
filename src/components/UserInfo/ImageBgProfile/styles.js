import styled from 'styled-components'
import styles from '../../../styles'

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
`

export const UserImgbackground = styled.div`
  width:100%;
  height:170px;
  position: absolute;
  top: 0;
  left: 0;
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
  ${props => props.imageBackground
    && `background-image: url(${props.imageBackground});`

  }

  .edit-image{
    color: #f8f8f8;
    float: right;
    margin: 10px 10px 0 0;
    font-size: 20px;
    cursor: pointer;

    &:before{
      content: 'Trocar imagem de fundo';
      opacity: 0;
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
  @media (max-width: ${styles.containerMiddle}) {
      background-position-y: -60px;
      height:220px;
      background-size: 600px ;
  }
  @media (min-width: 620px) {
      background-size: cover ;
  }

`