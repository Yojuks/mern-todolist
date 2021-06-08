import { Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';

export default function ToDoListFooter({ tasks, onFilterChanged, clearCompleted }) {
  return (
    <div className="todolist-footer">
      <div className="buttons">
        <div>
          <span className="items-left">
            {tasks.filter((element) => !element.completed).length} items left
          </span>
        </div>
        <Button onClick={() => onFilterChanged(null)}>All</Button>
        <Button onClick={() => onFilterChanged(true)}>Active</Button>
        <Button onClick={() => onFilterChanged(false)}>Completed</Button>
        <div>
          <Button className="completed" onClick={clearCompleted}>
            Clear completed
          </Button>
        </div>
      </div>
    </div>
  );
}
