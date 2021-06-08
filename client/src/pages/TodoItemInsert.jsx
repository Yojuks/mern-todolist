import React, {Component} from 'react';
import Task from './Task';
import ToDoListFooter from './ToDoListFooter';
import {Input} from 'antd';
import 'antd/dist/antd.css';

import api from '../api/index';

class TodoItemInsert extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      filter: null,
      tasks: [],
      isActive: {
        active: false,
        id: '',
      },
    };
  }

  createTask = async (e) => {
    const payload = {
      title: e.currentTarget.value,
      isDone: false,
    };

    if (e.key === 'Enter') {
      await api.insertTodoItem(payload).then((res) => {
        this.getAll();
      });
      this.setState({
        inputValue: '',
      });
    }
  };

  getAll = async () => {
    await api.getAllTodoItems().then((response) => {
      if (response && response['data'] && response['data']['data']) {
        this.setState({
          tasks: response.data.data,
        });
      }
    });
  };

  deleteTask = async (taskId) => {
    await api.deleteTodoItemById(taskId).then((res) => {
      this.getAll();
    });
  };

  onChange = (e) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  toggleSpan = (checkId, isDone, title) => {
    const payload = {
      isDone: !isDone,
      title: title,
    };
    api.updateTodoItemById(checkId, payload).then((res) => {
      this.getAll();
    });
  };

  setSpan = (taskId) => {
    const { active } = this.state.isActive;
    this.setState({
      isActive: { active: !active, id: taskId },
    });
  };

  updateSpan = (key, isDone, value, id) => {
    const payload = {
      isDone: isDone,
      title: value,
    };

    if (key === 'Enter') {
      api.updateTodoItemById(id, payload).then((res) => {
        this.setState({
          isActive: { active: true },
        });
        this.getAll();
      });
    }
  };

  updateSpanBlur = (isDone, value, id) => {
    const payload = {
      isDone: isDone,
      title: value,
    };

    api.updateTodoItemById(id, payload).then((res) => {
      this.setState({
        isActive: { active: true },
      });
      this.getAll();
    });
  };

  changeFilter = (filterValue) => {
    this.setState({
      filter: filterValue,
    });
  };

  getItems = (filterValue) => {
    const { tasks } = this.state;
    if (filterValue === null) return tasks;
    if (filterValue === true) {
      return tasks.filter((task) => task.isDone === false);
    }
    if (filterValue === false) {
      return tasks.filter((task) => task.isDone === true);
    }
  };

  clearCompleted = async () => {
    const { tasks } = this.state;
    const payload = tasks.filter((task) => task.isDone === true);

    let dataList = [];

    function getFields(input, field) {
      let output = [];
      for (let i = 0; i < input.length; ++i) output.push(input[i][field]);
      return output;
    }

    dataList = getFields(payload, '_id');
    const sentData = {
      list: dataList,
    };

    await api.deleteCompeteItems(sentData).then((res) => {
      console.log(res);
      this.getAll();
    });

    // const myPromise = new Promise((resolve, reject) => {
    //   resolve(
    //     payload.map((item) => {
    //       api.deleteTodoItemById(item._id).then((res) => {});
    //     })
    //   );
    // });
    // myPromise.then((res) => console.log(res)).catch(() => this.getAll());
    // myPromise.then(() => this.getAll());

    // payload.map((item) => {
    //   api.deleteTodoItemById(item._id).then((res) => {
    //     if (res) {
    //       counter -= 1;
    //       console.log('counter----->', counter);
    //     }
    //   });
    // });
    // if (counter === 0) {
    //   this.getAll();
    // }

    // setTimeout(() => {

    // }, 100);
  };

  componentDidMount = async () => {
    this.getAll();
  };

  render() {
    const { filter } = this.state;
    const tasks = this.getItems(filter);
    return (
      <div className="wrapper">
        <h1>To Do List</h1>
        <Input
          type="text"
          placeholder="Enter task"
          onChange={this.onChange}
          value={this.state.inputValue}
          onKeyPress={(e) => this.createTask(e)}
        />
        <div className="tasks padding">
          {tasks?.map((item) => {
            return (
              <Task
                task={item}
                key={item._id}
                deleteTask={this.deleteTask}
                toggleSpan={this.toggleSpan}
                updateSpan={this.updateSpan}
                active={this.state.isActive}
                setSpan={this.setSpan}
                updateSpanBlur={this.updateSpanBlur}
              />
            );
          })}
        </div>

        <ToDoListFooter
          tasks={tasks}
          onFilterChanged={this.changeFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default TodoItemInsert;

