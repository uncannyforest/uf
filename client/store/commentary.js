import axios from 'axios'

const SET_ALL_COMMENTS = 'SET_ALL_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'

const initialState = {
  commentsById: {},
  topLevelComments: []
}

const setAllComments = (allComments) => ({
  type: SET_ALL_COMMENTS,
  payload: allComments
})

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment
})

export const loadComments = (paperId) => async (dispatch) => {
  const { data } = await axios.get(`/api/papers/${paperId}/comments`)
  dispatch(setAllComments(data))
}

export const postComment = (input) => async (dispatch) => {
  const { data } = await axios.post(`/api/papers/${input.paperId}/comments`, input)
  dispatch(addComment(data))
}

export default function (state = initialState, action) {
  let commentsById, topLevelComments
  switch (action.type) {
    case SET_ALL_COMMENTS:
      commentsById = {}
      topLevelComments = []
      action.payload.forEach((comment) => {
        commentsById[comment.id] = comment
        comment.children = []
      })
      action.payload.forEach((comment) => {
        if (comment.parentId)
          commentsById[comment.parentId].children.push(comment)
        else
          topLevelComments.push(comment)
      })
      return {
        commentsById,
        topLevelComments
      }
    case ADD_COMMENT:
      topLevelComments = [...state.topLevelComments]
      const comment = action.payload;
      comment.children = []
      if (comment.parentId) {
        state.commentsById[comment.parentId].children.push(comment)
      } else {
        topLevelComments.push(comment)
      }
      state.commentsById[comment.id] = comment
      return {
        ...state,
        topLevelComments
      };
    default:
      return state
  }
}
