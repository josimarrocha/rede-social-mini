import styled from 'styled-components'
import styles from '../../styles'

export const HeaderContainer = styled.header`
  background-color: ${styles.colorPrimary};
  position: fixed;
  width: 100%;
  top: 0;
  box-shadow: 1px 1px 5px #999;
  z-index:10;

  .header-content{
    max-width: ${styles.container};
    height: 40px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    color: #f8f8f8;
    padding: 0 10px;
    position: relative;

    .div{
      display: flex;
      align-items: center;
      
      .header-logo{
        margin-right: 20px;
        a{
          color: ${styles.colorWhite};
        }
      }

      span i{
        font-size:20px;
        position: relative;
        text-align:center;
        cursor: pointer;
      }

      span .fas b{
        padding-top: 2px;
        position: absolute;
        background: #333;
        border-radius: 50%;
        width: 18px;
        color: #f8f8f8;
        height: 18px;
        font-size: 13px;
        top: -5px;
        left:10px;
      }

      .notifications{
        margin-left:15px;
        margin-right: 15px;
      }
      
      .my-perfil{
        display: block;
        font-size: ${styles.fontSmall};
        font-weight: bold;
        color: ${styles.colorWhite};
      }
    }

    .icon-search{
        display: none;
        position: absolute;
        right: 60px;
      @media (max-width: ${styles.containerSmallSmall + 'px'}) {
        display: block;
      }
    }
    .logout{
      position: absolute;
      right: 10px;
      cursor: pointer;

      @media (max-width: ${styles.containerMiddle}) {
        display: none;
      }
    }
  }
`
