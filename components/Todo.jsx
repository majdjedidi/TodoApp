import { useState, useEffect } from "react";
import Item from "./Item";
import { nanoid } from "nanoid";
export default function Todo() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [inputValue, setInputValue] = useState("");
  const [currentId, setCurrentId] = useState("");
  function addOrUpdateTodo() {
    if (!inputValue) {
      return;
    }
  
    let toEdit = false;
    if (currentId) {
      const indexToEdit = todos.findIndex(todo => todo.id === currentId);
      if (indexToEdit !== -1) {
        todos[indexToEdit].body = inputValue;
        toEdit = true;
      }
      setCurrentId("");
    }
  
    if (!toEdit) {
      const newTask = {
        id: nanoid(),
        body: inputValue,
        isDone: false,
      };
      setTodos(prevTasks => [newTask, ...prevTasks]);
    }
  
    setInputValue("");
  }
  
  function deleteTask(id) {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  }
  function checkTask(id) {
    setTodos((oldTodos) =>
      oldTodos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  }
  function editTask(id) {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        setInputValue(todos[i].body);
        setCurrentId(todos[i].id);
      }
    }
  }
  function sortTodos(todos) {
    const sortedTodos = [...todos];
    sortedTodos.sort((a, b) => {
      if (a.isDone === b.isDone) {
        return 0;
      } else if (a.isDone) {
        return 1;
      } else {
        return -1;
      }
    });

    return sortedTodos;
  }

  const elements = todos.map((task) => (
    <Item
      key={task.id}
      id={task.id}
      task={task.body}
      deleteTask={deleteTask}
      isDone={task.isDone}
      checkTask={checkTask}
      editTask={editTask}
    />
  ));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    function areArraysEqual(array1, array2) {
      if (array1.length !== array2.length) {
        return false;
      }

      for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
          return false;
        }
      }

      return true;
    }
    const sortedTodos = sortTodos(todos);
    if (!areArraysEqual(sortedTodos, todos)) {
      setTodos(sortedTodos);
    }
  }, [todos]);

  return (
    <div className="content">
      <nav className="navbar">
        <h1>To-do List App</h1>
        <input
          type="text"
          placeholder="add task to do"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={addOrUpdateTodo}>
          <ion-icon name="add"></ion-icon>
        </button>
      </nav>
      <main className="tasks">
        {todos.length > 0 ? (
          elements
        ) : (
          <div className="empty">
            No tasks added yet ! <br />
            What are you willing to do today ?
          </div>
        )}
      </main>
    </div>
  );
}
