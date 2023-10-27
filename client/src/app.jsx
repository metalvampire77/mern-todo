import { useState, useRef, useEffect } from "preact/hooks";
import axios from "axios";
import CreateTodo from "./components/createTodo";
import "./app.css";
import bin from "./assets/delete.png";

export function App() {
  const [todos, setTodos] = useState([]);

  const fetchData = () => {
    axios
      .get("/get")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  };

  fetchData();

  const completeTodo = (id, done) => {
    axios
      .put("/update/" + id, { done })
      .then((result) => console.log("success"))
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id) => {
    axios
      .delete("/delete/" + id)
      .then((result) => console.log("success"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <div className="container">
        <h1>To-do list</h1>
        <CreateTodo />
        {todos.length === 0 ? (
          <div>
            <h2>no record</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              className="items"
              key={todo.id}
              onClick={() => completeTodo(todo._id, todo.done)}
            >
              <p className={todo.done ? "lineThrough" : "none"}>
                {/* <input type="checkbox"></input> */}
                <label className="todo-text">{todo.todo}</label>
              </p>
              <img
                src={bin}
                alt=""
                className="delete-img"
                onClick={() => deleteTodo(todo._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
