import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import Delete from 'material-ui/svg-icons/action/delete'

import { addTaskAction, saveTaskToDbAsyncAction } from './state/toDo'

const mapStateToProps = state => ({
    _text: state.toDo.text,
    _taskListFromDb: state.toDo.taskListFromDb
})

const mapDispatchToProps = dispatch => ({
    _addTaskAction: event => dispatch(addTaskAction(event.target.value)),
    _saveTaskToDbAsyncAction: () => dispatch(saveTaskToDbAsyncAction())
})

const ToDoList = (props) => (
    <div>
        <div>
            <TextField
                value={props._text}
                onChange={props._addTaskAction}
            />
            <RaisedButton
                primary={true}
                label={'Add task to database'}
                onClick={props._saveTaskToDbAsyncAction}
            />
        </div>
        <div>
            <TextField
                value={'pass value from state'}
                onChange={() => { }}
            />
            <RaisedButton
                label={'Filter!'}
                onClick={() => { }}
            />
        </div>
        <div>
            <RaisedButton
                label={'Show completed!'}
                onClick={() => { }}
            />
            <RaisedButton
                label={'Show uncompleted!'}
                onClick={() => { }}
            />
            <RaisedButton
                label={'Show all!'}
                onClick={() => { }}
            />
        </div>
        {props._taskListFromDb.map((task) =>
            <MenuItem
                key={task.key}
                rightIcon={<Delete />}
            >
                {task.text}
            </MenuItem>)}
    </div>
)



export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);