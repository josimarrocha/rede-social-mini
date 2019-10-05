import styled from 'styled-components'
import styles from '../../../styles'

export const UserConfigAccount = styled.div`
  position: absolute;
  top: 200px;
  right:-65%;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #ddd;
  z-index: 10 !important;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: ${styles.containerSmall + 'px'}) {
    right: 15px;
    top:250px;
  }
  @media (max-width: ${styles.containerMiddle}) {
    right: 15px;
    top:250px;
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