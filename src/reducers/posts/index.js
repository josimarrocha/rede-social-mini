import { SHOW_POSTS_TIMELINE, MORE_POSTS, NEW_POST_USER, ADD_LIKE_POST, REMOVE_LIKE_POST, POSTS_BY_USER, DELETE_POST, SINGLE_POST_BY_USER } from './actionsCreators'

const initialState = {
  total: '',
  perPage: '',
  page: '',
  lastPage: '',
  posts: [],
}
const createReducer = (initialState, actions) => {
  return (state = initialState, action) => actions.hasOwnProperty(action.type)
    ? actions[action.type](state, action) : state
}

const posts = createReducer(initialState, {
  [SHOW_POSTS_TIMELINE]: (state, action) => ({
    ...state,
    ...action.payload,
    posts: action.payload.clean ? [] : state.posts.concat(action.payload.posts)
  }),

  [MORE_POSTS]: (state, action) => ({
    ...state,
    posts: state.posts.concat(action.payload.posts)
  }),

  [NEW_POST_USER]: (state, action) => ({
    ...state,
    posts: [...action.payload, ...state.posts]
  }),

  [DELETE_POST]: (state, action) => ({
    ...state,
    posts: state.posts.filter(post => post.id !== action.payload)
  }),

  [POSTS_BY_USER]: (state, action) => ({
    ...state,
    ...action.payload,
    posts: state.posts.concat(action.payload.posts)
  }),

  [SINGLE_POST_BY_USER]: (state, action) => ({
    ...state,
    posts: action.payload
  }),

  [ADD_LIKE_POST]: (state, action) => {
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
  },
  [REMOVE_LIKE_POST]: (state, action) => ({
    ...state,
    posts: state.posts
      .map(post => post.id === action.payload.post_id
        ? {
          ...post,
          likes: +post.likes - 1,
          usersLikesPost: post.usersLikesPost.filter(user => user.user_id !== action.payload.user_id)
        }
        : { ...post })
  })
})


export default posts