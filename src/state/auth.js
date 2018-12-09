import { auth, database, googleProvider } from '../firebaseConfig'
import { loadTaskListFromDbAsyncAction} from './toDo'


const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'
const EMAIL_CHANGE = 'auth/EMAIL_CHANGE'
const PASSWORD_CHANGE = 'auth/PASSWORD_CHANGE'

export const initAuthChangeListeningAsyncAction = () => (dispatch, getState) => {
  auth.onAuthStateChanged(
    user => {
      if (user) {
        dispatch(logInAction(user))
        dispatch(saveLogInTimestampAsyncAction())
        dispatch(loadTaskListFromDbAsyncAction())
      } else {
        dispatch(logOutAction())
      }
    }
  )
}

export const logOutAsyncAction = () => (dispatch, getState) => {
  auth.signOut()
}

export const logInByGoogleAsyncAction = () => (dispatch, getState) => {
  auth.signInWithPopup(googleProvider)
}

export const logInAsyncAction = () => (dispatch, getState) => {
   const email = getState().auth.email
   const password = getState().auth.password

  auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      alert('Something is wrong! Check console for error details!')
      console.log(error)
    })
}

const saveLogInTimestampAsyncAction = () => (dispatch, getState) => {
  database.ref('jfddl6/loginsLogs').push({
    timestamp: Date.now()
  })
}

const logInAction = user => ({ 
  type: LOG_IN,
  user
})
const logOutAction = () => ({ type: LOG_OUT })

export const emailChangeAction = newValue => ({
  type: EMAIL_CHANGE,
  newValue
})
export const passwordChangeAction = newValue => ({
  type: PASSWORD_CHANGE,
  newValue
})

const INITIAL_STATE = {
  isUserLoggedIn: false,
  email: '',
  password: '',
  user: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.user
      }
    case LOG_OUT:
      return {
        ...state,
        isUserLoggedIn: false,
        user: null
      }
    case EMAIL_CHANGE:
      return {
        ...state,
        email: action.newValue
      }
    case PASSWORD_CHANGE:
      return {
        ...state,
        password: action.newValue
      }
    default:
      return state
  }
}