import { useState, useRef, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDownloadDone, MdDeleteOutline } from "react-icons/md";

import "./index.css";

const TodoList = (props) => {
	const {
		deleteTodo,
		updateTodoStatus,
		editTodo,
		eachTodo,
		editTodoStatus,
		isHover,
	} = props;
	const { id, todo, isCompleted, isEditable } = eachTodo;

	const inputRef = useRef(null);

	const [todoValue, updateTodoValue] = useState(todo);

	useEffect(() => {
		if (isEditable && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditable]);

	const renderInputEle = () => {
		return (
			<div className="editing-each-todo-container">
				<input
					ref={inputRef}
					type="text"
					onChange={(e) => updateTodoValue(e.target.value)}
					value={todoValue}
					className={
						isEditable ? "editing-todo-input" : "edit-todo-input"
					}
				/>
				<button
					type="button"
					onClick={() => editTodo(id, todoValue)}
					className="done-btn"
				>
					<MdDownloadDone className="done-icon" />
				</button>
			</div>
		);
	};

	const renderParagraphEle = () => {
		const classname = isHover ? "each-todo-hover" : "each-todo";
		return (
			<div
				className={
					isHover
						? "each-todo-container-hover"
						: "each-todo-container"
				}
			>
				<label
					htmlFor={`todo${id}`}
					className={
						isCompleted ? `underline ${classname}` : classname
					}
				>
					{todo}
				</label>
				<button
					className="edit-btn"
					type="button"
					onClick={() => editTodoStatus(id)}
				>
					<AiOutlineEdit className="edit-icon" />
				</button>
			</div>
		);
	};

	return (
		<li key={todo.id} className="li-ele">
			<div className="each-todo-main-container">
				<div className="checkbox-container">
					<input
						className="input-checkbox"
						type="checkbox"
						onChange={() => updateTodoStatus(id)}
						id={`todo${id}`}
					/>
				</div>
				{isEditable ? renderInputEle() : renderParagraphEle()}
				<button
					className="delete-btn"
					type="button"
					onClick={() => deleteTodo(id)}
				>
					<MdDeleteOutline className="delete-icon" />
				</button>
			</div>
		</li>
	);
};

export default TodoList;
