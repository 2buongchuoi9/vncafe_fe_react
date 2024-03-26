import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cateReducer from "./slice/Category.slice"
import authReducer from "./slice/Auth.slice"
import commentReducer from "./slice/CurrentComment.slice"

const rootReducer = combineReducers({
    category: cateReducer,
    auth: authReducer,
    comment: commentReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
