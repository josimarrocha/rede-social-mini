import styled from 'styled-components'
import styles from '../../../styles'

export const ResultList = styled.div`
  background: ${styles.colorWhite};
  right: 0;
  top: 26px;
  position:absolute;
  z-index: 15;
  width: 100%;
  box-shadow: 0px 1px 5px #666;  
  ul{
    width: 100%;
  }

  li{
    display: flex;
    color: #333;
    padding: 3px 5px 3px 5px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;

    &:hover{
      background: #ddd;
    }

    span{
      width: 35px;
      margin-right: 10px;
      img{
        max-width: 100%;
      }
    }

    b{
      font-size: ${styles.fontSmall}
    }
  }
`