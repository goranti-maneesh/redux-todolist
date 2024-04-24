import React, { useState, useRef, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDownloadDone, MdDeleteOutline, MdDone } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { GoDash } from "react-icons/go";
import Popup from "reactjs-popup";

import "./index.css";

const classnamesObj = {
	YET_TODO: "yet-todo",
	IN_PROGRESS: "in-progress",
	COMPLETED: "completed",
};

const TodoList = React.memo((props) => {
	const {
		deleteTodo,
		updateTodoStatus,
		editTodo,
		eachTodo,
		editTodoStatus,
		isHover,
	} = props;
	console.log(12345);
	const { id, todo, status, isEditable } = eachTodo;

	const inputRef = useRef(null);

	const [todoValue, updateTodoValue] = useState(todo);

	useEffect(() => {
		if (isEditable && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditable]);

	const onChangeTodoStatus = (status) => {
		updateTodoStatus(id, status);
	};

	const onClickDeleteTodo = () => {
		deleteTodo(id);
	};

	const renderCompletedTodoDeleteBtn = () => {
		return (
			<button
				className="delete-btn"
				type="button"
				onClick={onClickDeleteTodo}
			>
				<MdDeleteOutline className="delete-icon" />
			</button>
		);
	};

	const renderOtherTodosDeleteBtn = () => {
		return (
			<div className="popup-main-container">
				<Popup
					modal
					trigger={
						<button className="delete-btn" type="button">
							<MdDeleteOutline className="delete-icon" />
						</button>
					}
				>
					{(close) => (
						<>
							<div className="popup-container">
								<p className="popup-text">
									Want to delete todo without completing
								</p>
							</div>
							<div className="popup-btns-container">
								<button
									type="button"
									className="popup-yes-btn"
									onClick={onClickDeleteTodo}
								>
									Yes
								</button>
								<button
									type="button"
									className="trigger-button popup-cancel-btn"
									onClick={() => close()}
								>
									Cancel
								</button>
							</div>
						</>
					)}
				</Popup>
			</div>
		);
	};

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
		const classname = isHover ? `each-todo-hover` : `each-todo`;
		return (
			<div
				className={
					isHover
						? `each-todo-container-hover ${classnamesObj[status]}`
						: `each-todo-container ${classnamesObj[status]}`
				}
			>
				<label htmlFor={`todo${id}`} className={classname}>
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
					{!(status === "YET_TODO") && (
						<button
							className="yet-todo-btn"
							onClick={() => onChangeTodoStatus("YET_TODO")}
							type="button"
						>
							<GoDash
								width="18px"
								height="18px"
								className="yet-todo-icon"
							/>
						</button>
					)}
					{!(status === "IN_PROGRESS") && (
						<button
							className="in-progress-btn"
							onClick={() => onChangeTodoStatus("IN_PROGRESS")}
							type="button"
						>
							<TfiReload className="in-progress-icon" />
						</button>
					)}
					{!(status === "COMPLETED") && (
						<button
							className="completed-btn"
							onClick={() => onChangeTodoStatus("COMPLETED")}
							type="button"
						>
							<MdDone className="completed-icon" />
						</button>
					)}
				</div>
				{isEditable ? renderInputEle() : renderParagraphEle()}
				{status === "COMPLETED"
					? renderCompletedTodoDeleteBtn()
					: renderOtherTodosDeleteBtn()}
			</div>
		</li>
	);
});

export default TodoList;
