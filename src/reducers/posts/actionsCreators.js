import api from '../../config/api'
import { friendsIO } from '../../config/util'
import { SHOW_COMMENT_POST } from '../comments/actionsCreators'

export const SHOW_POSTS_TIMELINE = 'posts:SHOW_POSTS_TIMELINE'
export const MORE_POSTS = 'posts:MORE_POSTS'
export const NEW_POST_USER = 'posts:NEW_POST_USER'
export const ADD_LIKE_POST = 'posts:ADD_LIKE_POST'
export const REMOVE_LIKE_POST = 'posts:REMOVE_LIKE_POST'
export const POSTS_BY_USER = 'posts:POSTS_BY_USER'
export const DELETE_POST = 'posts:DELETE_POST'
export const SINGLE_POST_BY_USER = 'posts:SINGLE_POST_BY_USER'

export const showPostsTimeline = (page) => async dispatch => {
  const { data: posts } = await api.get(`post/timeline/${page}`)
  dispatch({
    type: SHOW_POSTS_TIMELINE,
    payload: {
      total: posts.total,
      perPage: posts.perPage,
      page: posts.page,
      lastPage: posts.lastPage,
      posts: posts.data,
    }
  })
}

export const singlePostByUser = (url) => async dispatch => {
  dispatch({
    type: SHOW_POSTS_TIMELINE,
    payload: {
      posts: [],
      clean: true
    }
  })
  const { data } = await api.get(url)
  await dispatch({
    type: SINGLE_POST_BY_USER,
    payload: data.data
  })
  if (data.hasOwnProperty('comments')) {
    await dispatch({
      type: SHOW_COMMENT_POST,
      payload: {
        post_id: data.data[0].id,
        comments: data.comments,
        where: 'comments'
      }
    })
  }
}

export const postsByUser = (page, id) => async dispatch => {
  try {
    const { data: posts } = await api.get(`post/profile/${id}/${page}`)
    dispatch({
      type: POSTS_BY_USER,
      payload: {
        total: posts.total,
        perPage: posts.perPage,
        page: posts.page,
        lastPage: posts.lastPage,
        posts: posts.data
      }
    })

  } catch (error) {
    console.log(error)
  }
}

let timer
export const createNewPost = (post, usersNotification) => async dispatch => {
  clearTimeout(timer)
  const newPost = await api.post('post/newpost', post)
  dispatch({
    type: NEW_POST_USER,
    payload: newPost.data
  })
  usersNotification.forEach(async user => {
    await api.post('/notification', {
      user_id: user.id,
      action_id: 6,
      post_id: newPost.data[0].id,
      comment_id: ''
    })
  })

  timer = setTimeout(() => {
    friendsIO.emit('pendingFriends', 'notifications')
  }, 1000)
}

export const deletePost = (post_id) => async dispatch => {
  await api.delete(`/post/delete/${post_id}`)
  dispatch({
    type: DELETE_POST,
    payload: post_id
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