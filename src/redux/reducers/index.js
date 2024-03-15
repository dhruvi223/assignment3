import { combineReducers } from "redux";
import { signInReducer } from "./productReducer";
import { signUpReducer } from "./productReducer";
import { fetchProduct } from "./productReducer";
import { searchReducer } from "./productReducer";
import { paginationReducer } from "./productReducer";
import { descReducer } from "./productReducer";
import { asceReducer } from "./productReducer";
import { jewelleryReducer } from "./productReducer";
import { electronicsReducer } from "./productReducer";
import { menReducer } from "./productReducer";
import { womenReducer } from "./productReducer";

const reducers = combineReducers({
    signIn : signInReducer,
    signUp : signUpReducer,
    fetchproduct : fetchProduct,
    search : searchReducer,
    pagination : paginationReducer,
    desc : descReducer,
    asce : asceReducer,
    jewellery : jewelleryReducer,
    electronics : electronicsReducer,
    mem : menReducer,
    women : womenReducer
})

export default reducers