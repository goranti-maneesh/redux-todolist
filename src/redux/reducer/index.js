// import { combineReducers } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";

import { todoReducer } from "./reducer";

export default combineReducers({
	todos: todoReducer,
});
