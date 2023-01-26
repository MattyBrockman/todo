import { useState, useEffect } from 'react';

import './Tasks.css';
import Todo from './Todo';
import TodoForm from './TodoForm';

import initialTasks from './InitialTasks';

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("everything");


  const TODO_BASE_URL = 'http://localhost:3000/todos';

  const fetchData = async () => {
    const response = await fetch(TODO_BASE_URL)
    const data = await response.json()
    setTasks((tasks) => data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function addTodo(task) {
    const postBody = JSON.stringify({
      title: task,
      completed: false,
    })

    fetch(TODO_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: postBody
    }).then(
      response => response.json()
    ).then((result) => {
      setTasks(tasks => [
        ...tasks,
        {
          id: result.id,
          title: result.title,
          completed: result.completed,
        }
      ])
    })
  }

  function deleteTodo(taskId) {
    fetch(TODO_BASE_URL + '/' + taskId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(() =>
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId))
    )
  }

  function setTodoCompleted(todo) {
    const putBody = JSON.stringify({
      completed: !todo.completed
    })

    fetch(TODO_BASE_URL + '/' + todo.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: putBody
    }).then(() => {
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === todo.id) {
            return {
              ...task, ...{
                completed: !todo.completed
              }
            }
          }

          return task;
        })
      })
    })
  }

  const onUnitChange = (e) => {
    console.log('changed', e.target.value)
    setFilter(e.target.value)
  }

  return (
    <>
      <div className="Tasks">
      <h1>Tasks</h1> 
      <hr></hr>

      <label for="unit-select">Choose a unit: </label>
    

        <select name="math" id="unit-select" onChange={onUnitChange}>
          <option value="everything">Everything</option>

          <option value="notcompleted">Not Completed</option>
          <option value="completed">Completed</option>


        </select>
        
        <table>

          <thead>
            <tr>
              <th>Todo ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.filter(todo => {
              if (filter === 'everything') {
                return true;
              }

              if (filter === 'notcompleted' && todo.completed == false) {
                return true;
              }

              if (filter === 'completed' && todo.completed == true) {
                return true;
              }





              return false;
            }).map((todo) => {
              return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} setTodoCompleted={setTodoCompleted} />
            })}
          </tbody>
        </table>
        <table>
          
        </table>
      </div>

      <div>
        <TodoForm addTodo={addTodo} />
      </div>
    </>
  );
}

export default Tasks;