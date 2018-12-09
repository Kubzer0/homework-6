import React from 'react'

import Auth from './Auth'
import ToDoList from './ToDoList';

const App = (props) => (
  <div>
    <Auth>
      <div>
        <ToDoList/>
      </div>
    </Auth>
  </div>
)


export default App