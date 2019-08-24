import api from '../../config/api'

export const SHOW_POSTS_TIMELINE = 'posts:SHOW_POSTS_TIMELINE'
export const NEW_POST_USER = 'posts:NEW_POST_USER'
export const ADD_LIKE_POST = 'posts:ADD_LIKE_POST'
export const REMOVE_LIKE_POST = 'posts:REMOVE_LIKE_POST'
export const POSTS_BY_USER = 'posts:POSTS_BY_USER'

export const showPostsTimeline = () => async dispatch => {
  const { data: posts } = await api.get('post/timeline')
  dispatch({
    type: SHOW_POSTS_TIMELINE,
    payload: {
      posts: posts[0].data,
    }
  })
}

export const postsByUser = (id) => async dispatch => {
  const { data: posts } = await api.get(`post/profile/${id}`)
  dispatch({
    type: POSTS_BY_USER,
    payload: posts
  })
}

export const createNewPost = (post) => async dispatch => {
  const newPost = await api.post('post/newpost', post)

  dispatch({
    type: NEW_POST_USER,
    payload: newPost.data
  })
}

export const addLikePost = (post_id) => async dispatch => {
  const likePost = await api.post('post/like', { post_id })
  dispatch({
    type: ADD_LIKE_POST,
    payload: likePost.data
  })
}

export const removeLikePost = ({ post_id, user_id }) => async dispatch => {
  try {
    await api.delete(`post/like/${post_id}`)
    dispatch({
      type: REMOVE_LIKE_POST,
      payload: {
        post_id,
        user_id
      }
    })
  } catch (err) {
    console.log(err)
  }
}