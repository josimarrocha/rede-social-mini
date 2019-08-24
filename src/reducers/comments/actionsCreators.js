import api from '../../config/api'

export const SHOW_COMMENT_POST = 'comment:SHOW_COMMENT_POST'
export const ADD_COMMENT_POST = 'comment:ADD_COMMENT_POST'
export const ADD_LIKE_COMMENT = 'comment:ADD_LIKE_COMMENT'
export const MORE_COMMENTS = 'comments:MORE_COMMENTS'
export const REMOVE_LIKE_COMMENT = 'comment:REMOVE_LIKE_COMMENT'

export const showCommentPost = (post_id, answers) => async dispatch => {
  let comments, reply, where
  if (answers) {
    comments = await api.get(`post/comment/reply/${post_id}/1`)
    where = 'commentsAnswered'
    reply = true
  } else {
    comments = await api.get(`post/comment/${post_id}/1`)
    where = 'comments'
  }
  if (comments.data[0].data.length > 0) {
    dispatch({
      type: SHOW_COMMENT_POST,
      payload: {
        post_id,
        comments: comments.data[0],
        where
      }
    })
  }
}

export const addCommentPost = ({ post_id, comment, image_comment }, { isAnswer, commentId }) => async dispatch => {
  let data, where, id

  if (!isAnswer) {
    data = await api.post('post/new/comment', { post_id, comment, image_comment })
    where = 'comments'
    id = post_id
  } else {
    data = await api.post('post/new/comment/reply', { post_id, comment, image_comment, comment_id: commentId })
    where = 'commentsAnswered'
    id = commentId
  }
  dispatch({
    type: ADD_COMMENT_POST,
    payload: {
      id,
      where,
      comment: data.data[0],
    }
  })
}

export const addNewComment = (id, comment, answer) => dispatch => {
  let where
  if (answer) {
    where = 'commentsAnswered'
  } else {
    where = 'comments'
  }
  dispatch({
    type: ADD_COMMENT_POST,
    payload: {
      comment, where, id
    }
  })
}

export const viewMoreComments = (page, id, answers) => async dispatch => {
  let data, where
  if (answers) {
    data = await api.get(`post/comment/reply/${id}/${page}`)
    where = 'commentsAnswered'
  } else {
    where = 'comments'
    data = await api.get(`post/comment/${id}/${page}`)
  }
  dispatch({
    type: MORE_COMMENTS,
    payload: {
      comments: data.data[0],
      id,
      where
    }
  })
}

export const addLikeComment = ({ post_id, comment_id }, answer, idCommentPrincipal) => async dispatch => {
  let likeComment, where, id
  if (answer) {
    likeComment = await api.post('post/comment/reply/like', { post_id, comment_id })
    where = 'commentsAnswered'
    id = idCommentPrincipal
  } else {
    likeComment = await api.post('post/comment/like', { post_id, comment_id })
    where = 'comments'
    id = likeComment.data.like.post_id
  }
  dispatch({
    type: ADD_LIKE_COMMENT,
    payload: {
      data: likeComment.data,
      id,
      where
    },
  })
}

export const removeLikeComment = ({ post_id, comment_id, user_id }, answer, idCommentPrincipal) => async dispatch => {
  try {
    let where, id
    if (answer) {
      await api.delete(`/post/comment/reply/like/${post_id}/${comment_id}`)
      where = 'commentsAnswered'
      id = idCommentPrincipal
    } else {
      await api.delete(`/post/comment/like/${post_id}/${comment_id}`)
      where = 'comments'
      id = post_id
    }
    dispatch({
      type: REMOVE_LIKE_COMMENT,
      payload: {
        where,
        id,
        comment_id,
        user_id
      }
    })
  } catch (err) {
    console.log(err)
  }
}