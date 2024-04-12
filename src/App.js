import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { addTodoAction } from "./redux/action/action";

const App = () => {
	const [todo, setTodo] = useState("");
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);

	const addTodo = (todo) => {
		const newTodo = {
			id: 1,
			todo,
			isCompleted: false,
		};

		dispatch(addTodoAction(newTodo));
		setTodo("");
	};

	const deleteTodo = (id) => {
		dispatch();
	};

	const updateTodoStatus = (id) => {
		dispatch();
	};

	const editTodo = (id, todo) => {
		const editTodoObj = {
			id,
			todo,
		};
		dispatch();
	};

	return (
		<div>
			<div>
				<input
					type="text"
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
				/>
				<button type="button" onClick={addTodo}>
					Add Todo
				</button>
			</div>
		</div>
	);
};

export default App;
