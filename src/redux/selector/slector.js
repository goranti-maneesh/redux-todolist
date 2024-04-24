import { createSelector } from "reselect";

let getTodos = (state) => state.todos;

export const getFilteredTodos = createSelector(
	[getTodos],
	(todos) => (status) => {
		console.log(todos, "todos");
		return todos.filter((eachTodo) => eachTodo.status === status);
	}
);
