import styled from 'styled-components'
import styles from '../../styles'

export const UserAccountContainer = styled.section`
  max-width: 280px;
  width:100%;
  position: fixed;
  z-index: 2;

  @media (max-width: ${styles.containerMiddle}) {
    position: relative;
    max-width: 100%;
  }
`

export const UserInfoContainer = styled.div`
  background: ${styles.colorWhite};
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 15px #ccc;
  margin-bottom: 20px;
  position: relative;

  .menu-user-config{
    position: absolute;
    right: 0;
    top: 170px;
    cursor: pointer;
    padding: 8px;
    z-index: 2;
    @media (max-height:700px) {
      top: 135px;
    }

    @media (max-width: ${styles.containerMiddle}) {
      top: 220px
    }
  }
`

export const UserImg = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  img{
    box-shadow: 1px 1px 15px #000;
    max-width: 100px;
    max-height: 100px;
    width:100%;
    border-radius: 50%;
    margin: 50px auto 0 auto;
    display: block;
    @media (max-height:700px) {
      margin-top:10px
    }
    @media (max-width:${styles.containerSmall + 'px'}) {
      margin-top:10px
    }
  }
`

export const UserData = styled.div`
  text-align:center;
  position: relative;
  z-index: 1;
  margin-top:20px;
  font-size:${styles.fontSmall};

  @media (max-width: ${styles.containerMiddle}) {
    margin-top:30px;
  }

  .user-info-username{
    margin-bottom: 20px;
    vertical-align: middle;
    @media (max-height:700px) {
      margin-bottom: 10px;
    }
    &:before{
      content: '';
      border-width: 1px;
      width: 100%;
      border-color: #ddd;
      border-style: solid;
      position: absolute;
      left: 0;
      top:-10px;
    }

    div{
      display: flex;
      flex-wrap: wrap;
      input{
        height: 30px;
        width: 80%;
        flex: 1 1 100%;
      }
    }
  }
  .user-info-describe{
    textarea{
      width: 100%;
      @media (max-width: ${styles.containerMiddle}) {
        width: 80%;
      }
      @media (max-width: ${styles.containerSmallSmall + 'px'}) {
        width: 100%;
      }
    }
    p{
      letter-spacing: 0.5px; 
      font-style: italic;
        @media (max-width: ${styles.containerMiddle}) {
          max-width: 350px;
          margin: 0 auto;
        }
        span{
          margin-left: 8px;
          cursor: pointer;
        }
    }
  }

  .user-info-username .actions, .user-info-describe .actions{
    display: flex;
    flex: 1 1 100%;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    button{
      padding: 4px 5px;
    }
    button:nth-child(1){
      margin-right: 10px;
    }
    i{
      color: ${styles.colorPrimary};
      font-size: 20px;
      padding: 0px 8px;
    } 
  }
  .user-info-email{
    margin-top: 20px;
    font-weight:600;
    font-style: italic;
  }
  .user-info-local{
    margin-top: 20px;
    @media (max-height:700px) {
      margin-top: 10px;
    }
  }


  .profile-status-friend{
    display: flex;
    justify-content: center;
    align-items:center;
    border: 1px solid #999;
    padding: 5px 0;
    margin-top: 8px;
    color: #333;
    font-weight:600;
    cursor: default;

    i{
      margin-right:8px;
      font-size:20px;
      color: green;
    }
  }

  .profile-rm{
    display: block;
    font-size: ${styles.fontSmall};
    margin-top: 5px;
    color: #333;
    text-decoration: underline;
  }

  .profile-add{
    a{
      margin-top: 5px;
      display: block;
      color: ${styles.colorWhite};
      border: 1px solid #ccc;
      padding: 7px 0;
      background: ${styles.colorPrimary};
    }
    i{
      margin-right: 8px;
    }
  }
  .profile-add-cancel{
    span{
      margin-top: 5px;
      display: block;
      color: ${styles.colorWhite};
      border: 1px solid #ccc;
      padding: 7px 0;
      background: ${styles.colorPrimary};
    }
    span.cancel{
      margin-top: 5px;
      display: block;
      color: ${styles.colorWhite};
      border: 1px solid #ccc;
      padding: 7px 0;
      background: ${styles.colorPrimary};
      cursor: pointer;
    }
    i{
      margin-right: 8px;
    }
  } 
  
`
