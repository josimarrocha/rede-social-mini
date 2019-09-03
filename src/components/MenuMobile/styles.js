import styled from 'styled-components'
import styles from '../../styles'

export const MenuMobileContainer = styled.div`
  flex: 2;
  position: relative;
  
  .menu-content{
    display: none !important;
    position: relative;

    .icon-menu{
      padding: 8px;
    }

    @media (max-width: ${styles.containerMiddle}) {
      display: block !important;
      position: absolute;
      right: 10px;
      font-size: 20px;
    }
    
    .menu-list{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: ${styles.fontSmall};
      color: ${styles.colorWhite};
      background: #fff;
      box-shadow: 0 2px 5px #666;
      position: absolute;
      z-index: 20;
      top: 33px;
      right: -15px;
    }  
    .menu-item{
      background: ${styles.colorPrimary};
      text-transform: uppercase;
      font-weight: 600;
      text-align: center;
      border-bottom: 1px solid #ccc;
      font-size: ${styles.fontSmall};
      padding: 10px 0;
      width: 100%;
    }
  }
`
