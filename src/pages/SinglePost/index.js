import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import UserPosts from '../../components/UserPosts'
import Loader from '../../components/Loader'
import { singlePostByUser } from '../../reducers/posts/actionsCreators'
import { showCommentPost } from '../../reducers/comments/actionsCreators'
import { showLoader } from '../../reducers/ui'
import { Container } from '../Home/styles'

const SinglePost = ({ match: { params, url }, singlePostByUser, showCommentPost, showLoader, loader }) => {
  const [onLoad, setOnLoad] = useState(true)

  useEffect(() => {
    setTimeout(() => showLoader(false), 700)
    setOnLoad(true)
    if (!params.commentId) {
      showCommentPost(params.postId)
    }
  }, [loader])

  const renderPosts = () => {
    return (
      <UserPosts
        postsTimeline={singlePostByUser}
        url={url}
        profileId={params.profileId}
      />
    )
  }
  return <>{loader
    ? <Loader isLoading={loader} />
    : <Container onLoad={() => {
      if (onLoad) {
        try {
          const commment = document.getElementById(`comment${params.commentId}`)
          commment.classList.add('comment-active')
          setTimeout(() => window.scrollTo(0, commment.getBoundingClientRect().y - 150), 1000)
          setOnLoad(false)
        } catch (error) { }
      }
    }}>
      {renderPosts()}
    </Container>}
  </>
}

const mapStateToProps = state => ({
  loader: state.ui.showLoader
})

export default connect(mapStateToProps, { singlePostByUser, showCommentPost, showLoader })(SinglePost)