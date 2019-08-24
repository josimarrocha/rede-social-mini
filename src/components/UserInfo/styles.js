import styled from 'styled-components'
import styles from '../../styles'

export const UserAccountContainer = styled.section`
  max-width: 280px;
  width:100%;
  position: fixed;
  z-index: 0;

  @media (max-width: ${styles.containerMiddle}) {
    position: relative;
    max-width: 100%;
  }
`

export const UserInfoContainer = styled.div`
  background: ${styles.colorWhite};
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 15px #ddd;
  margin-bottom: 20px;
  position: relative;

  .menu-user-config{
    position: absolute;
    right: 0;
    top: 170px;
    cursor: pointer;
    padding: 5px;
  }
`

export const UserImg = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  img{
    max-width: 100px;
    border-radius: 50%;
    margin: 50px auto 0 auto;
    display: block
  }
`

export const UserImgbackground = styled.div`
  width:100%;
  height: 170px;
  position:absolute;
  top: 0;
  left: 0;
  background-image: url('http://localhost:3000/images/tarn-nguyen-4a52btspyY8-unsplash.jpg');
  background-size:cover;
  background-position: center;

  @media (max-width: ${styles.containerMiddle}) {
      background-position-y: -60px;
  }

`

export const UserData = styled.div`
  text-align:center;
  position: relative;
  z-index: 1;
  margin-top:20px;
  font-size:${styles.fontSmall};

  .user-info-username{
    margin-bottom: 20px;
    vertical-align: middle;

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
  .user-info-describe p{
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

  .user-info-username .actions, .user-info-describe .actions{
    display: flex;
    flex: 1 1 100%;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    button{
      padding: 4px 5px;
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
  
`
