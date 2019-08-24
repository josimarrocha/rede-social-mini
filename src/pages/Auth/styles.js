import styled from 'styled-components'
import styles from '../../styles'

export const Container = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 60px auto;
  height: 80vh;

  .login-content{
    display: flex;
    height: 100%;
    width: 100%;
    box-shadow: 0 0 15px #888;

    .brand{
      width:100%;
      background: ${styles.colorPrimary};
      flex: 1;
    }
  }
`