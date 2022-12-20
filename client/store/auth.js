import axios from 'axios'

const SET_CURRENT_USER = 'SET_CURRENT_USER'

const initialState = {
  user: null
}

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const loadLoginState = () => async (dispatch) => {
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
    const { data } = await axios.get('/api/user')
    dispatch(setCurrentUser(data))
  } else {
    delete axios.defaults.headers.common['Authorization']
    dispatch(setCurrentUser(null))
  }
}

export const registerUser = (creds, thenDo) => async (dispatch) => {
  const { data } = await axios.post('/api/user', creds)
  axios.defaults.headers.common['Authorization'] = data.token
  localStorage.setItem('token', data.token)
  dispatch(setCurrentUser(data.user))
  if (thenDo) thenDo(data.user);
}

export const logInUser = (creds, thenDo) => async (dispatch) => {
  const { data } = await axios.post('/api/user/set', creds)
  axios.defaults.headers.common['Authorization'] = data.token
  localStorage.setItem('token', data.token)
  dispatch(setCurrentUser(data.user))
  if (thenDo) thenDo(data.user);
}

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
  dispatch(setCurrentUser(null))
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
