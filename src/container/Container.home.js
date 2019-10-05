import { connect } from 'react-redux'
import { showPostsTimeline, addLikePost, removeLikePost, deletePost } from '../reducers/posts/actionsCreators'
import { showFriends, loadingProfile } from '../reducers/friends/actionsCreators'
// import { loadingProfile as infoUserLogged } from '../reducers/userInfo/actionsCreators'
import { showCommentPost } from '../reducers/comments/actionsCreators'
import { postsByUser } from '../reducers/posts/actionsCreators'
import { hide } from '../reducers/ui'

import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Post from '../components/UserPosts/Post'

// HOME
const mapStateToPropsHome = state => ({
  page: state.posts.page,
  lastPage: state.posts.lastPage,
})
const mapDispatchToPropsHome = {
  showPostsTimeline,
  showFriends,
  loadingProfile
}
export const HomeContainer = connect(mapStateToPropsHome, mapDispatchToPropsHome)(Home)

// =================================
// PROFILE
const mapStateToPropsProfile = state => ({
  profile: state.friendsInfo.profile,
})

const mapDispatchToPropsProfile = {
  loadingProfile,
  postsByUser,
  showFriends
}

export const ProfileContainer = connect(mapStateToPropsProfile, mapDispatchToPropsProfile)(Profile)

// ==================================
// POST
const mapStateToPropsPost = state => ({
  userInfo: state.userInfo,
  profile: state.friendsInfo.profile
})

const mapDispatchToPropsPost = {
  postsByUser,
  addLikePost,
  removeLikePost,
  showCommentPost,
  deletePost,
  hide
}

export const PostContainer = connect(mapStateToPropsPost, mapDispatchToPropsPost)(Post)
