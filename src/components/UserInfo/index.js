import React from 'react'
import { connect } from 'react-redux'
import Friends from './Friends'
import { UserAccountContainer, UserInfoContainer, UserImg, UserData } from './styles'

const UserInfo = ({ userInfo }) => {
  return (
    <UserAccountContainer>
      <UserInfoContainer>
        <UserImg>
          <img src={`http://localhost:3333/imageProfile/${userInfo.image_profile}`} alt="" />
        </UserImg>
        <UserData>
          <div className="user-info-username">
            <h2>{userInfo.username}</h2>
          </div>
          <div className="user-info-describe">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, porro vel sit molestias explicabo enim, voluptatum et pra</p>
          </div>
          <div className="user-info-email">
            <p>{userInfo.email}</p>
          </div>
          <div className="user-info-local">
            <p>Brasil, São Paulo, SP</p>
          </div>
        </UserData>
      </UserInfoContainer>
      <Friends />
    </UserAccountContainer>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps)(UserInfo)
