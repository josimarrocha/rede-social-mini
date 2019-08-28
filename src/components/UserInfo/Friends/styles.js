import styled from 'styled-components'
import styles from '../../../styles'

export const FreindsContainer = styled.section`
  box-shadow: 1px 1px 15px #ddd;
  width: 100%;
  background: ${styles.colorWhite};

  @media (max-width: ${styles.containerMiddle}) {
   display: none;
  }

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
    
   p{
    width: 100%;
    text-align: center;
   }

   a{
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    box-shadow: 1px 1px 5px #aaa;
    margin-right: 5px;
    margin-bottom: 5px;
    flex: 1 1 25%;
    height: 100px;

    &:last-child{
    flex: 0 1 31.5%;
    }

    &:first-child{
      flex: 0 1 31.5%;
    }
   }
  }
`

export const Friend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .friend-img{
    /* width: 50px; */
    img{
      width: 55px;
      height: 50px;
    }
  }

  .friend-name p{
    width: 100%;
    text-align: center;
    font-weight: 500;
    color: ${styles.colorPrimary};
    font-size: ${styles.fontSmallSmall}
  }
  
`