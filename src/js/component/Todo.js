import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const Home = () => {
	const [newTodo, setNewTodo] = useState("");
	const [todoList, setTodoList] = useState([]);

	const newUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/luciacanalda", {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) throw new Error("Failed to create new user");
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				let response = await fetch("https://playground.4geeks.com/todo/users/luciacanalda");
				if (!response.ok) {
					if (response.status === 404) await newUser();
					response = await fetch("https://playground.4geeks.com/todo/users/luciacanalda");
				}
				const data = await response.json();
				setTodoList(data.todos);
			} catch (error) {
				console.error("Error fetching todos:", error);
			}
		};

		fetchTodos();
	}, []);

	const handleEnter = async (e) => {
		if (e.key === "Enter" && newTodo.trim()) {
			const data = { label: newTodo, done: false };
			try {
				const response = await fetch("https://playground.4geeks.com/todo/todos/luciacanalda", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) throw new Error("Failed to add new todo");
				const todo = await response.json();
				setTodoList((prevList) => [...prevList, todo]);
				setNewTodo("");
			} catch (error) {
				console.error("Error adding todo:", error);
			}
		}
	};

	const handleDelete = async (index) => {
		const itemToDelete = todoList[index];
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${itemToDelete.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setTodoList(todoList.filter((_, i) => i !== index));
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const handleDeleteAll = async () => {
		try {
			await fetch('https://playground.4geeks.com/todo/users/luciacanalda', { method: 'DELETE' });
			await newUser();  
			setTodoList([]);
		} catch (error) {
			console.error("Error deleting all todos:", error);
		}
	}

	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">My To-do List</h1>
			<input className="form-control" placeholder="¿Nuevas tareas?"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				onKeyDown={handleEnter} />
			<h3 className="mt-2">To-do: </h3>
			<ul>
				{todoList.length === 0 ? (
					<p>Sin tareas pendientes</p>
				) : (
						todoList.map((todo, index) => (
							<p key={index}>
								{todo.label}
								<span
									onClick={() => handleDelete(index)}>
									✅
								</span>
							</p>
						))
				)}
			</ul>
			<div className="col-12">
				<button className="btn btn-primary" onClick={handleDeleteAll}>Eliminar tareas</button>
			</div>
		</div>
	);
};

export default Home;