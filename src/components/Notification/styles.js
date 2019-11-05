import styled from 'styled-components'
import styles from '../../styles'

export const Container = styled.div`
  max-width: 400px;
  width: 100%;
  position: absolute;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.3);
  background: ${styles.colorWhite};
  top: 45px;
  left: 45px;
  z-index: 5;
  color: #333;
  display: flex;
  flex-direction: column;
  background-color: #ffffee;
  outline: none;

  @media (max-width: ${styles.containerMiddle}) {
    left:0;
  }

  &:before{
    content: '';
    position: absolute;
    border-width: 10px;
    border-color: transparent transparent ${styles.colorWhite} transparent;
    border-style: solid;
    top: -20px;
    left: 90px;
    @media (max-width: ${styles.containerMiddle}) {
      left:135px;
    }
  }

  .notification-header{
    font-size: ${styles.fontSmallSmall};
    font-weight: 600;
    width: 100%;
    height: 25px;
    text-align: center;
    border-bottom: 1px solid #bbb;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      width: 100%;
      text-align:center;
    }
  }
`

export const NotificationList = styled.ul`
  width: 100%;
  text-align: left;
  height: 100%;
  max-height: 500px;
  overflow-y: scroll;
  a{
    color: inherit;
  }
  .notification-item{
    display: flex;
    border-bottom: 1px solid #bbb; 
    width: 100%;
    padding: 7px;
    background-color: #ddd;
    cursor: pointer;
    transition: background 200ms linear;

    &:hover{
      background-color: #eeeffb;
    }
    .img-profile{
      flex: 1;
      img{
        width: 35px;
        max-width: 100%;
      }
    }

  }
  .notification-info{
    flex:8;
    align-self: flex-start;
    font-size: 12px;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
    p{
      align-self: flex-start;
      position: relative;
    }

    small{
      margin-top: 7px;
      align-self: flex-start;
      font-weight: 600;
      color: #999;
    }

    .image_notification{
      width: 40px;
      max-width: 100%;
      position: absolute;
      top:0;
      align-self: flex-end;
      right: -60px;
    }
  }
`