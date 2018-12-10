import { database } from '../firebaseConfig'

const ADD_TASK = 'toDo/ADD_TASK'
const FILTER_BY_NAME = 'toDo/FILTER_BY_NAME'
const FILTER_BY_COMPLETED = 'toDo/FILTER_BY_COMPLETED'
const TOGGLE_COMPLETED = 'toDo/TOGGLE_COMPLETED'
const DELETE_TASK = 'toDO/DELETE_TASK'
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
            if (snapshot.val()) {
                const tasks = Object.entries(
                    snapshot.val()
                ).map(entry => ({
                    ...entry[1],
                    key: entry[0]
                }))
                dispatch(
                    loadTasks(tasks)
                )
            }
            else {
                dispatch(loadTasks([]))
            }

        }
    )
}

export const stopListeningToDb = () => (dispatch, getState) => {

}

const INITIAL_STATE = {
    text: '',
    taskListFromDb: [],
    filterText: '',
    isCompleted: ''
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
                text: '',
                taskListFromDb: action.tasks
            }
        case FILTER_BY_NAME:
            return {
                ...state
            }
        case FILTER_BY_COMPLETED:
            return {
                ...state
            }
        case TOGGLE_COMPLETED:
            return {
                ...state
            }
        case DELETE_TASK:
            return {
                ...state
            }
        default:
            return state
    }
}