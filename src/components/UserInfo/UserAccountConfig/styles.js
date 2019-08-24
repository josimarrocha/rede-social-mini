import styled from 'styled-components'
import styles from '../../../styles'

export const UserConfigAccount = styled.div`
  position: absolute;
  background: #f8f8f8;
  right:-65%;
  top: 200px;
  border-radius: 5px;
  border: 1px solid #ddd;

  @media (max-width: ${styles.containerSmall + 'px'}) {
    right: 10px;
  }

  li{
    font-size: ${styles.fontSmall};
    cursor: pointer;
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;

    &:hover{
      background: #ddd;
    }
  }
`