import { useState, useRef } from "preact/hooks";
import axios from 'axios'

function CreateTodo() {
    const [todo, setTodo] = useState('');
    const textBoxRef = useRef(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://127.0.0.1:5123/', { todo })
        .then(result => {
          console.log(result);
          textBoxRef.current.value = '';
          setTodo('');
        })
        .catch(err => console.log(err));
    }
  
    return (
      <>
        <h1>todo</h1>
        <input type="text" name="todo" ref={textBoxRef} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={handleSubmit}>
          add
        </button>
      </>
    );
}

export default CreateTodo