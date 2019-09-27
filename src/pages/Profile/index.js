/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'
import Loader from '../../components/Loader'
import ImageBgProfile from '../../components/UserInfo/ImageBgProfile'
import { postsByUser, singlePostByUser } from '../../reducers/posts/actionsCreators'
import { loadingProfile, showFriends } from '../../reducers/friends/actionsCreators'
import { showCommentPost } from '../../reducers/comments/actionsCreators'
import { Container } from '../Home/styles'

const Profile = ({ loadingProfile, match: { params, url }, postsByUser, showFriends, profile, lastPage, page, singlePostByUser, showCommentPost }) => {
  const [isVistitprofile, setIsVisitProfile] = useState(true)
  const [isLoader, setIsLoader] = useState(true)
  const [isInitScrollEvent, setIsInitScrollEvent] = useState(true)
  const [onLoad, setOnLoad] = useState(true)
  let scrollY = 0

  useEffect(() => {
    setIsLoader(true)
    setOnLoad(true)
    const initialData = async () => {
      await loadingProfile(params.profileId)
      await showFriends(params.profileId)
    }
    initialData()
    const loadinProfile = async () => {
      await postsByUser(params.profileId, 1)
      setIsLoader(false)
    }

    const loadingSinglePost = async () => {
      await singlePostByUser(url)
      showCommentPost(params.postId)
      setIsLoader(false)
    }
    const loadingSinglePostWithIdcomment = async () => {
      // const newUrl = url.replace(/\/comment\/\d+/g, '')
      await singlePostByUser(url)
      setIsLoader(false)
    }

    if (params.username && params.postId && !params.commentId) {
      loadingSinglePost()
    } else if (params.username && params.postId && params.commentId) {
      loadingSinglePostWithIdcomment()
    } else if (params.profileId && params.username && !params.postId && !params.commentId) {
      loadinProfile()
    }
    return () => window.onscroll = null
  }, [params.profileId, params.postId, params.commentId])

  const scroll = (e) => {
    setIsInitScrollEvent(true)

    let pagey = page + 1
    scrollY = e.currentTarget.scrollY + e.currentTarget.innerHeight
    if (document.body.scrollHeight - scrollY < 600) {
      isInitScrollEvent && page < lastPage && postsByUser(params.profileId, pagey)
      setIsInitScrollEvent(false)
    }
  }

  params.profileId && params.username && !params.postId && !params.commentId ? window.onscroll = scroll : ''

  const renderImageBackground = () => {
    if (params.profileId && params.username && !params.postId && !params.commentId) {
      return (
        <ImageBgProfile
          imageBackground={profile.image_background}
          visitProfile={isVistitprofile}
        />
      )
    }
  }

  return (
    <>
      {isLoader
        ? <Loader isLoading={isLoader} />
        : <Container onLoad={params.commentId ? (e) => {
          if (onLoad) {
            try {
              const commment = document.getElementById(`comment${params.commentId}`)
              commment.classList.add('comment-active')
              setTimeout(() => window.scrollTo(0, commment.getBoundingClientRect().y - 150), 500)
              setOnLoad(false)
            } catch (error) { }
          }

        } : null}>
          <UserInfo visitProfile={isVistitprofile} />
          {renderImageBackground()}
          <UserPosts visitProfile={isVistitprofile} />
        </Container>
      }
    </>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  profile: state.friendsInfo.profile,
  lastPage: state.initialDataProfile.lastPage,
  page: state.initialDataProfile.page
})

export default connect(mapStateToProps, { loadingProfile, postsByUser, showFriends, singlePostByUser, showCommentPost })(Profile)
