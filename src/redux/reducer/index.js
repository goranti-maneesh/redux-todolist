import { combineReducers } from "react-redux";

import { todoReducer } from "./reducer";

export default combineReducers({
	todo: todoReducer,
});
