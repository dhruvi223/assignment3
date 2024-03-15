import { combineReducers } from "redux";
import { signInReducer } from "./productReducer";
import { signUpReducer } from "./productReducer";

const reducers = combineReducers({
    signIn : signInReducer,
    signUp : signUpReducer
})

export default reducers