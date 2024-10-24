import React, { useState } from "react";
import "./App.css";
import TodoTable from "./components/TodoTable";
import NewTodoForm from "./components/NewTodoForm";

function App() {
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [todos, setTodos] = useState([
    { rowNumber: 1, rowDescription: "Feed puppy", rowAssigned: "User One" },
    { rowNumber: 2, rowDescription: "Water plants", rowAssigned: "User Two" },
    { rowNumber: 3, rowDescription: "Make dinner", rowAssigned: "User One" },
    {
      rowNumber: 4,
      rowDescription: "Charge phone battery",
      rowAssigned: "User One",
    },
  ]);

  const addTodo = (description, assigned) => {
    let rowNumber = 0;
    if (todos.length > 0) {
      rowNumber = todos[todos.length - 1].rowNumber + 1; // get the last todo and add one to it
    } else {
      rowNumber = 1;
    }
    const newTodo = {
      rowNumber: todos.length + 1,
      rowDescription: description,
      rowAssigned: assigned,
    };
    setTodos((todos) => [...todos, newTodo]); // Use setTodos ( which is a state updater function ) to change todos by adding a newTodo to the existing todos
  };

  const deleteTodo = (deleteTodoRowNumber) => {
    // An identifier so that react would know which row to delete
    let filtered = todos.filter((value) => {
      // A new filtered todos array is created by iterating the original todos array, each iteration is represented by "value" as the iterator
      return value.rowNumber !== deleteTodoRowNumber; // Only the todo items whose rowNumber does not match the deleteTodoRowNumber will be included in the filtered array
    });
    setTodos(filtered); //  Calling the setTodos state updater function which updates the todos state with the new filtered array
  };

  return (
    <div className="mt-5 container">
      <div className="card">
        <div className="card-header">Your Todo's</div>
        <div className="card-body">
          <TodoTable todos={todos} deleteTodo={deleteTodo} />
          <button
            onClick={() => setShowAddTodoForm(!showAddTodoForm)} // On click setShowAddTodoForm will be updated with the OPPOSITE of the curr ent state of showAddTodoForm (true / false)
            className="btn btn-primary"
          >
            New Todo
          </button>
          {showAddTodoForm && <NewTodoForm addTodo={addTodo} />}
        </div>
      </div>
    </div>
  );
}

export default App;
