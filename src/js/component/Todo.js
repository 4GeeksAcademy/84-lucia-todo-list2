import React, { useState } from 'react'

const Todo  = () => {
	const [inputValue, setinputValue] = useState ("")
	const [todos,setTodos] = useState([]);

	const addTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim()) {
		  setTodos([...todos, inputValue]);
		  setInputValue(""); 
		}
	  };

	  const deleteTodo = (index) => {
		setTodos(todos.filter((_, i) => i !== index));
	  };
  return (

	<div className='container'>


	<h1>To-Dos</h1>
<div className='tasks'>

<ul className='list-group'>

	<li>
	<input
	type="text" 
	onChange= {(e) => setinputValue(e.target.value)}
	value={inputValue}
	onKeyPress= {addTodo}

	placeholder='What Needs to be Done?'/>

</li>

{todos.map((todo, index) => (
          <li key={index}>
            {todo}
			<button onClick={() => deleteTodo(index)}>
              Done!
            </button>
          </li>
		   ))}
 </ul>
      <div>{todos.length} tasks</div>
    </div>
	</div>
  );
};

export default Todo;