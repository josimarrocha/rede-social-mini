import styled from 'styled-components'
import styles from '../../../styles'

export const FreindsContainer = styled.section`
  box-shadow: 1px 1px 15px #ccc;
  width: 100%;
  background: ${styles.colorWhite};
  border-radius: 10px;

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
    padding-left: 9px;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    
   p{
    width: 100%;
    text-align: center;
   }

   a{
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 1px 5px #aaa;
    margin-right: 5px;
    margin-bottom: 5px;
    max-width: 31.444%;
    /* height: 100px; */
   }
  }
`

export const Friend = styled.div`
  min-width: 83px;
  min-height:86px;
  text-align:center;
  .friend-img{
    height: 100%;
    img{
      max-width: 100%;
    }
  }

  .friend-name{
    p{
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    width: 100%;
    text-align: left;
    font-weight: 500;
    color: ${styles.colorWhite};
    font-size: ${styles.fontSmallSmall};
    bottom: 0;
    left:0;
    z-index: 1;
    height: 40px;
    padding-top: 3px;
  }
}
`