import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { documentsReducer } from "./documentsReducer";

export const rootReducer = combineReducers (
  {user:userReducer, documents:documentsReducer}
)