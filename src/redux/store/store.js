import { createStore } from "react-redux";

import rootStore from "../reducer";

export const store = createStore(rootStore);
