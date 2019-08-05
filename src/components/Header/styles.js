import styled from 'styled-components'
import styles from '../../styles'

export const HeaderContainer = styled.header`
  background-color: ${styles.colorPrimary};
  position: fixed;
  width: 100%;
  top: 0;
  box-shadow: 1px 1px 5px #999;

  .header-content{
    max-width: ${styles.container};
    height: 40px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    color: #f8f8f8;
    padding: 0 10px;

    .form-input{
      border: none;
      border-radius: 4px;
      height: 25px;
      outline: none;
      padding-left: 5px;
      width: 20rem;
    }
  }
`