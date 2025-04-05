import { configureStore } from "@reduxjs/toolkit";
import todoRedcer from "../features/todo/todoSlice";


const store = configureStore({
    reducer: {
        todos: todoRedcer
    }
});

export default store;
