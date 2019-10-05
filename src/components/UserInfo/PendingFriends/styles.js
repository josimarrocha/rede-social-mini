import styled from 'styled-components'
import styles from '../../../styles'

export const PendingFriendsConatiner = styled.div`
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.3);
  background: ${styles.colorWhite};
  max-width: 300px;
  width: 100%;
  position: absolute;
  top: 45px;
  left:15px;
  color: #333;
  display: flex;
  flex-direction: column;
  z-index: 5;

  &:before{
    content: '';
    position: absolute;
    border-width: 10px;
    border-color: transparent transparent ${styles.colorWhite} transparent;
    border-style: solid;
    left: 90px;
    top: -20px;
  }
  .pending-friends-header{
    width: 100%;
    font-weight: 600;
    border-bottom: 1px solid #bbb;
    background-color: #eee;
    height: 25px;
    p{
      text-align: center;
      width: 100%;
      font-size: ${styles.fontSmallSmall};
    }
  }
`

export const PendingFriendsContent = styled.div`
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;

    p{
      text-align: center;
      padding: 5px 0;
    }

  .pending-friends{
    display: flex;
    padding:5px 5px 5px 5px;
    justify-content:space-between;
    border-top:1px solid ${styles.colorBorder};
    width: 100%;
    background-color: #ddd;
    &:hover{
      background-color: #ccc;
    }
  }

  .img-friend{
    flex: 1;
  }
  
  .pending-friend{
    margin-left: 10px;
    display: flex;
    flex:4;
    align-items: flex-start;
    flex-direction: column;
    color: #555;

    p.friend-name{
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      align-self: flex-start;
    }

    .actions{
      margin-top: 7px;
      align-self: flex-start;

      button{
        margin-right: 5px;
        background: ${styles.colorPrimary};
        border:none;
        outline: none;
        padding: 5px 6px;
        border-radius: 2px;
        font-weight: 500;
        letter-spacing: .7px;
        color: ${styles.colorWhite};
        font-size: ${styles.fontSmall};
        cursor: pointer;
      }
    }
  }
`

