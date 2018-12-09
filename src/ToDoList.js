import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { addTaskAction, saveTaskToDbAsyncAction } from './state/toDo'

const mapStateToProps = state => ({
    _text: state.toDo.text
  })

  const mapDispatchToProps = dispatch => ({
    _addTaskAction: event => dispatch(addTaskAction(event.target.value)),
    _saveTaskToDbAsyncAction: () => dispatch(saveTaskToDbAsyncAction())
  })

const ToDoList = (props) => (
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
  )



export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);