import {
  SHOW_COMMENT_POST,
  ADD_COMMENT_POST,
  ADD_LIKE_COMMENT,
  REMOVE_LIKE_COMMENT,
  MORE_COMMENTS
} from './actionsCreators'

const initialState = {
  comments: {},
  commentsAnswered: {}
}

const comments = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COMMENT_POST:
      return {
        ...state,
        [action.payload.where]: {
          // state[action.payload.where],
          [action.payload.post_id]: {
            ...action.payload.comments
          }
        }
      }
    case ADD_COMMENT_POST: {
      const { where, id: key, comment } = action.payload
      return {
        ...state,
        [where]: {
          ...state[where],
          [key]: {
            ...state[where][key],
            data: !state[where][key] ? [comment]
              : [...state[where][key].data, comment]
          }
        }
      }
    }
    case MORE_COMMENTS: {
      let { id, comments: commentss, where } = action.payload
      return {
        ...state,
        [where]: {
          ...state[where],
          [id]: {
            ...commentss,
            data: [...commentss.data, ...state[where][id].data]
          }
        }
      }
    }
    case ADD_LIKE_COMMENT:
      const { like, likeNumbers } = action.payload.data
      const { where, id } = action.payload
      return {
        ...state,
        [where]: {
          ...state[where],
          [id]: {
            ...state[where][id],
            data: state[where][id].data
              .map(comment => comment.comment_id === like.comment_id
                ? {
                  ...comment,
                  likes: likeNumbers,
                  numberLikes: [{ ...like }, ...comment.numberLikes]
                } : comment
              )
          }
        }
      }
    case REMOVE_LIKE_COMMENT: {
      const { comment_id, id, where, user_id } = action.payload
      return {
        ...state,
        [where]: {
          ...state[where],
          [id]: {
            ...state[where][id],
            data: state[where][id].data
              .map(comment => comment.comment_id === comment_id
                ? {
                  ...comment,
                  likes: +comment.likes - 1,
                  numberLikes: comment
                    .numberLikes
                    .filter(userLike => userLike.user_id !== user_id)
                }
                : { ...comment })
          }
        }
      }
    }
    default:
      return state
  }
}

export default comments