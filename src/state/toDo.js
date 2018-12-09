import { database } from '../firebaseConfig'

const ADD_TASK = 'toDo/ADD_TASK'

export const addTaskAction = newTextValue => ({
  type: ADD_TASK,
  newTextValue
})

export const saveTaskToDbAsyncAction = () => (dispatch, getState) => {
  const text = getState().toDo.text
  const uuid = getState().auth.user.uid

  database.ref(`/users/${uuid}`).push({
    text
  })
}


const INITIAL_STATE = {
  text: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        text: action.newTextValue
      }
    default:
      return state
  }
}