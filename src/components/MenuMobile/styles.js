import styled from 'styled-components'
import styles from '../../styles'

export const MenuMobileContainer = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  right: 10px;
  @media (max-width: ${styles.containerSmall + 'px'}) {
    display: block;
  }
  .menu-content{
    display: none !important;
    position: absolute;
    width: 100%;
    max-width: 200px;

    .icon-menu{
      position: absolute;
      right: 0px;
      top:-10px;
      padding:0 8px;
    }

    @media (max-width: ${styles.containerMiddle}) {
      display: block !important;
      position: absolute;
      right: 0px;
      font-size: 20px;
    }
    
    .menu-list{
      font-size: ${styles.fontSmall};
      color: #444;
      box-shadow: 0 2px 5px #666;
      position: absolute;
      z-index: 20;
      top: 20px;
      width: 100%;
    }  
    .menu-item{
      background: ${styles.colorWhite};
      text-align: left;
       border-bottom: 1px solid #ccc;
      font-size: 16px;
      padding: 8px 10px;
      width: 100%;
    }
  }
`
