import styled from 'styled-components'
import styles from '../../styles'

export const UserAccountContainer = styled.section`
  max-width: 280px;
  width:100%;
  position: fixed;
`

export const UserInfoContainer = styled.div`
  background: ${styles.colorWhite};
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 15px #ddd;
  margin-bottom: 20px;
`

export const UserImg = styled.div`
  width: 100%;

  img{
    border-radius: 50%;
    margin: 0 auto;
    display: block
  }
`

export const UserData = styled.div`
  text-align:center;
  margin-top:20px;
  font-size:${styles.fontSmall};

  .user-info-username{
    margin-bottom: 20px;
  }
  .user-info-describe p{
    letter-spacing: 0.5px;    
  }
  .user-info-email{
    margin-top: 20px;
    font-weight:500;
    font-style: italic;
  }
  .user-info-local{
    margin-top: 20px;
  }
`