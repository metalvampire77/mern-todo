import { useState, useRef } from "preact/hooks";
import axios from "axios";

function CreateTodo() {
  const [todo, setTodo] = useState("");
  const textBoxRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/", { todo })
      .then((result) => {
        console.log(result);
        textBoxRef.current.value = "";
        setTodo("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="todo">
      <input
        type="text"
        className="textBox"
        placeholder="enter todo"
        ref={textBoxRef}
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button className="addBtn" onClick={handleSubmit}>
        add
      </button>
    </div>
  );
}

export default CreateTodo;
