import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  taskList,
  createTask,
  deleteTask,
  doneTask,
  undoneTask,
  getFact,
} from "./reducers";

const reducers = {
  taskList,
  createTask,
  deleteTask,
  doneTask,
  undoneTask,
  getFact,
};
const rootReducer = combineReducers(reducers);

export const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
