import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import TodoList from "./components/TodoList";
import {
	addTodoAction,
	deleteTodoAction,
	updateTodoStatusAction,
	editTodoAction,
	editTodoStatusAction,
} from "./redux/action/action";
import "./App.css";

const App = () => {
	const [todo, setTodo] = useState("");
	const [id, setId] = useState(0);
	const [isHover, setHover] = useState(true);

	const dispatch = useDispatch();
	const todos = useSelector((state) => {
		return state.todos;
	});

	const addTodo = (event) => {
		event.preventDefault();
		if (todo === "") return;
		const newTodo = {
			id: id,
			todo,
			isCompleted: false,
			isEditable: false,
		};

		dispatch(addTodoAction(newTodo));
		setTodo("");
		setId((prev) => (prev += 1));
	};

	const deleteTodo = (id) => {
		dispatch(deleteTodoAction(id));
		setHover(true);
	};

	const updateTodoStatus = (id) => {
		dispatch(updateTodoStatusAction(id));
	};

	const editTodo = (id, todo) => {
		dispatch(editTodoAction(id, todo));
		setHover(true);
	};

	const editTodoStatus = (id) => {
		dispatch(editTodoStatusAction(id));
		setHover(false);
	};

	return (
		<div className="todos-main-container">
			<div>
				<h1 className="my-todos-heading">My Todos</h1>
			</div>
			<div>
				<form onSubmit={addTodo}>
					<input
						type="text"
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
						className="add-todo-input"
					/>
					<button type="submit" className="add-todo-button">
						Add Todo
					</button>
				</form>
				<ul className="ul-ele">
					{todos.map((eachTodo) => (
						<TodoList
							key={eachTodo.id}
							deleteTodo={deleteTodo}
							updateTodoStatus={updateTodoStatus}
							editTodo={editTodo}
							editTodoStatus={editTodoStatus}
							eachTodo={eachTodo}
							isHover={isHover}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
