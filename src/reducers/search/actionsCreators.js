import api from '../../config/api'

export const SEARCH_PROFILE = 'search:SEARCH_PROFILE'

export const searchProfile = (search) => async dispatch => {
  const { data } = await api.get(`search=${search}`)

  dispatch({
    type: SEARCH_PROFILE,
    payload: data
  })
}