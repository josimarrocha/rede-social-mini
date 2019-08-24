import styled from 'styled-components'
import styles from '../../../styles'

export const PendingFriendsConatiner = styled.div`
  box-shadow: 1px 1px 15px #ddd;
  width: 100%;
  background: ${styles.colorWhite};
  max-width: 280px;
  position: absolute;
  top: 40px;
  left:15px;
  color: #333;
  display: flex;
  flex-direction: column;
  z-index: 5;

  &::before{
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background: ${styles.colorWhite};
    left: 105px;
    top: -5px;
    transform: rotate(45deg)
  }

  .pending-friends-header{
    font-size: ${styles.fontSmall};
    font-weight: 600;
    text-align: center;
    padding: 10px 0;
  }
`

export const PendingFriendsContent = styled.div`
    overflow-y: auto;
    max-height: 300px;
    display: flex;
    flex-direction: column;

    p{
      text-align: center;
      padding: 5px 0;
    }

  .pending-friends{
    display: flex;
    padding:5px 5px 10px 5px;
    justify-content:space-between;
    margin-bottom: 5px;
    border-top:1px solid ${styles.colorBorder};
    width: 100%;
  }

  .img-friend{
    flex: 1;
  }
  
  .pending-friend{
    margin-left: 10px;
    display: flex;
    flex:3;
    flex-direction: column;

    p.friend-name{
      text-align: left;
      font-size: ${styles.fontSmall};
      font-weight: 600;
      align-self: flex-start;
      /* word-break:break-all; */
    }

    .actions{
      margin-top: 15px;

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

