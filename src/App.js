import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MdDone } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { GoDash } from "react-icons/go";

import TodoList from "./components/TodoList";
import {
	addTodoAction,
	deleteTodoAction,
	updateTodoStatusAction,
	editTodoAction,
	editTodoStatusAction,
} from "./redux/action/action";
import { getFilteredTodos } from "./redux/selector/slector";

import "./App.css";

const statusConstraints = {
	yetTodo: "YET_TODO",
	inprogress: "IN_PROGRESS",
	completed: "COMPLETED",
};

const App = () => {
	const { yetTodo, inprogress, completed } = statusConstraints;

	const [todo, setTodo] = useState("");
	const [id, setId] = useState(0);
	const [isHover, setHover] = useState(true);
	const [displayedTodoStatus, setDisplayTodoStatus] = useState(yetTodo);

	const dispatch = useDispatch();

	const filteredTodos = useSelector(getFilteredTodos);
	const todos = filteredTodos(displayedTodoStatus);

	const onClickSetDisplayTodoStatus = (todoStatus) => {
		setDisplayTodoStatus(todoStatus);
	};

	const addTodo = (event) => {
		event.preventDefault();
		if (todo === "") return;
		const newTodo = {
			id: id,
			todo,
			status: yetTodo,
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

	const updateTodoStatus = (id, todoStatus) => {
		dispatch(updateTodoStatusAction(id, todoStatus));
	};

	const editTodo = (id, todo) => {
		dispatch(editTodoAction(id, todo));
		setHover(true);
	};

	const editTodoStatus = (id) => {
		dispatch(editTodoStatusAction(id));
		setHover(false);
	};

	const renderButtons = () => {
		return (
			<div className="statusBtnContainer">
				<button
					type="button"
					onClick={() => onClickSetDisplayTodoStatus(yetTodo)}
					className={
						displayedTodoStatus === yetTodo
							? "yetTodoBtn selectedYetTodoBtn"
							: "yetTodoBtn"
					}
				>
					<GoDash className="dash-icon" />
					Yet Todo
				</button>
				<button
					type="button"
					onClick={() => onClickSetDisplayTodoStatus(inprogress)}
					className={
						displayedTodoStatus === inprogress
							? "inProgressBtn selectedInProgressBtn"
							: "inProgressBtn"
					}
				>
					<TfiReload className="reload-icon" />
					In Progress
				</button>
				<button
					type="button"
					onClick={() => onClickSetDisplayTodoStatus(completed)}
					className={
						displayedTodoStatus === completed
							? "completedBtn selectedCompletedBtn"
							: "completedBtn"
					}
				>
					<MdDone className="done-icon" />
					Completed
				</button>
			</div>
		);
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
				{renderButtons()}
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
