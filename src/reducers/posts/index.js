import { SHOW_POSTS_TIMELINE, NEW_POST_USER, ADD_LIKE_POST, REMOVE_LIKE_POST, POSTS_BY_USER, DELETE_POST } from './actionsCreators'

const initialState = {
  posts: [],
}

const initialDataProfile = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_POSTS_TIMELINE:
      return {
        ...state,
        posts: action.payload.posts,
      }
    case NEW_POST_USER:
      return {
        ...state,
        posts: [...action.payload, ...state.posts]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      }
    case POSTS_BY_USER:
      return {
        ...state,
        posts: [...action.payload]
      }
    case ADD_LIKE_POST:
      const { posts } = state
      const { like, likeNumbers } = action.payload
      return {
        ...state,
        posts: posts
          .map(post => post.id === like.post_id
            ? {
              ...post,
              likes: likeNumbers,
              usersLikesPost: [{ ...like }, ...post.usersLikesPost]
            }
            : { ...post })
      }
    case REMOVE_LIKE_POST:
      return {
        ...state,
        posts: state.posts
          .map(post => post.id === action.payload.post_id
            ? {
              ...post,
              likes: +post.likes - 1,
              usersLikesPost: post.usersLikesPost.filter(user => user.user_id !== action.payload.user_id)
            }
            : { ...post })
      }

    default:
      return state
  }
}

export default initialDataProfile