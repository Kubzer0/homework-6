import { database } from '../firebaseConfig'

const ADD_TASK = 'toDo/ADD_TASK'
const LOAD_TASKS = 'toDo/LOAD_TASKS'

const loadTasks = (tasks) => ({
    type: LOAD_TASKS,
    tasks
})

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

export const loadTaskListFromDbAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`/users/${uuid}`).on(
        'value',
        snapshot => {
            const tasks = Object.entries(
                snapshot.val()
            ).map(entry => ({
                ...entry[1],
                key: entry[0]
            }))
            console.log(tasks)
            dispatch(
                loadTasks(tasks)
            )
        }
    )
}

export const stopListeningToDb = () => (dispatch, getState) => {

}

const INITIAL_STATE = {
    text: '',
    taskListFromDb: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                text: action.newTextValue
            }
        case LOAD_TASKS:
            return {
                ...state,
                taskListFromDb: action.tasks
            }
        default:
            return state
    }
}