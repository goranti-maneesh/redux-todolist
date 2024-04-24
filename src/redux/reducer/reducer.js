export const todoReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_TODO":
			return [...state, action.payload];
		case "DELETE_TODO":
			return state.filter((eachTodo) => eachTodo.id !== action.payload);
		case "UPDATE_TODO_STATUS":
			return state.map((eachTodo) => {
				if (eachTodo.id === action.payload.id) {
					return {
						id: eachTodo.id,
						todo: eachTodo.todo,
						status: action.payload.todoStatus,
						isEditable: eachTodo.isEditable,
					};
				}
				return eachTodo;
			});
		case "EDIT_TODO":
			return state.map((eachTodo) => {
				if (eachTodo.id === action.payload.id) {
					return {
						id: eachTodo.id,
						todo: action.payload.todo,
						status: eachTodo.status,
						isEditable: !eachTodo.isEditable,
					};
				}
				return eachTodo;
			});
		case "EDIT_TODO_STATUS":
			return state.map((eachTodo) => {
				if (eachTodo.id === action.payload) {
					return {
						id: eachTodo.id,
						todo: eachTodo.todo,
						status: eachTodo.status,
						isEditable: !eachTodo.isEditable,
					};
				}
				return eachTodo;
			});
		default:
			return state;
	}
};
