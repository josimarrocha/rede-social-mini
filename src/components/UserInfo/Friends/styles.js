import styled from 'styled-components'
import styles from '../../../styles'

export const FreindsContainer = styled.section`
  box-shadow: 1px 1px 15px #ddd;
  width: 100%;
  background: ${styles.colorWhite};

  .friends-header{
    font-size: ${styles.fontSmall};
    font-weight: 600;
    text-align: center;
    padding: 10px 0;
    border-bottom:1px solid ${styles.colorBorder}
  }
  .friends-content{
    margin: 0 auto;
  }
  .friends-content > div{
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
  }
`

export const Friend = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 80px;
  align-items: center;
  box-shadow: 1px 1px 5px #aaa;
  margin-right: 5px;
  margin-bottom: 5px;
  flex: 1 1 25%;

  &:last-child{
    flex: 0 1 31.5%;
  }
  &:first-child{
    flex: 0 1 31.5%;
  }

  .friend-img{
    width: 50px;
    img{
      max-width: 100%;
    }
  }

  .friend-name p{
    text-align: center;
    font-weight: 500;
    color: ${styles.colorPrimary};
    font-size: ${styles.fontSmallSmall}
  }
  
`