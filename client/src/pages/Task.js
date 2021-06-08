import React, { useState } from 'react';
import { Checkbox, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './style.css';

export default function Task({
  task,
  deleteTask,
  toggleSpan,
  updateSpan,
  setSpan,
  active,
  updateSpanBlur,
}) {
  const [value, setValue] = useState(task.title);

  return (
    <div className="task">
      <div>
        <Checkbox
          type="checkbox"
          checked={task.isDone}
          onChange={(e) => toggleSpan(task._id, task.isDone, task.title)}
        />
      </div>
      <div className="div-before-span">
        {active.active && active.id === task._id ? (
          <Input
            type="text"
            value={value}
            className="task-element"
            onKeyPress={(e) => updateSpan(e.key, task.isDone, value, task._id)}
            onBlur={() => updateSpanBlur(task.isDone, value, task._id)}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className={task.isDone ? 'check' : ''} onClick={() => setSpan(task._id)}>
            {task.title}
          </span>
        )}
        <span className="close" onClick={() => deleteTask(task._id)}>
          <DeleteOutlined color="red" />
        </span>
      </div>
    </div>
  );
}
