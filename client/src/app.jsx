import { useState, useRef, useEffect } from "preact/hooks";
import axios from "axios";
import CreateTodo from "./components/createTodo";
import "./app.css";
import bin from "./assets/bin.png";

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
    <>
      <CreateTodo />
      {todos.length === 0 ? (
        <div>
          <h2>no record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="main"><div
          key={todo.id}
          className="todo"
          onClick={() => completeTodo(todo._id, todo.done)}
        >
          <p className={todo.done ? "lineThrough" : "none"}>{todo.todo} </p>
        </div>
        <img src={bin} className="deleteImg" alt="" onClick={() => deleteTodo(todo._id)}/>
        </div>
          
        ))
      )}
    </>
  );
}

export default App;
