import axios from 'axios'

const SET_CURRENT_USER = 'SET_CURRENT_USER'

const initialState = {
  user: {}
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
    const { data } = await axios.get('/api/user/')
    dispatch(setCurrentUser(data))
  } else {
    delete axios.defaults.headers.common['Authorization']
    dispatch(setCurrentUser({}))
  }
}

export const registerUser = (userData) => async (dispatch) => {
  const { data } = await axios.post('/api/users/register', userData)
  axios.defaults.headers.common['Authorization'] = data.token
  localStorage.setItem('token', data.token)
  dispatch(setCurrentUser(data.user))
}


export const logInUser = (userData) => async (dispatch) => {
  const { data } = await axios.post('/api/users/set', userData)
  axios.defaults.headers.common['Authorization'] = data.token
  localStorage.setItem('token', data.token)
  dispatch(setCurrentUser(data.user))
}

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
  dispatch(setCurrentUser({}))
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
