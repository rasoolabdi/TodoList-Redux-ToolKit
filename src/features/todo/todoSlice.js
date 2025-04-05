import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
});

export const getAsyncTodos = createAsyncThunk("todos/getAsyncTodos" , async(payload , {rejectWithValue}) => {
    try {
        const res = await api.get("/todos");
        return res.data;
    }
    catch(error) {
        return rejectWithValue(error.message)
    }
});

export const addAsyncTodo = createAsyncThunk("todos/addAsyncTodo" , async (payload , {rejectWithValue}) => {
    try {
        const res = await api.post("/todos" , {
            id: Date.now(),
            title: payload.title,
            completed: false
        });
        return res.data;
    }
    catch(error) {
        return rejectWithValue(error.message);
    }
});

export const toggleAsyncTodo = createAsyncThunk("todos/toggleAsyncTodo" , async (payload , { rejectWithValue}) => {
    try {
        const response = await api.patch(`/todos/${payload.id}` , {
            completed: payload.completed
        });
        return response.data;
    }
    catch(error) {
        return rejectWithValue(error.message);
    }
});

export const deleteAsyncTodo = createAsyncThunk("todos/deleteAsyncTodo" , async (payload , { rejectWithValue}) => {
    try {
        await api.delete(`/todos/${payload.id}`);
        return { id: payload.id }
    }
    catch(error) {
        return rejectWithValue(error.message); 
    }
});

const todoReducer = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        error: ""
    },
    // reducers: {    // local state
    //     addTodo: (state , action) => {
    //         const newTodo = {
    //             id: Date.now(),
    //             title: action.payload.title,
    //             completed: false
    //         };
    //         state.todos.push(newTodo);
    //     },
    //     toggleTodo: (state , action) => {
    //         const selectedTodo = state.todos.find((todo) => todo.id === Number(action.payload.id));
    //         selectedTodo.completed = action.payload.completed;
    //     },
    //     deleteTodo: (state , action) => {
    //         state.todos = state.todos.filter((todo) => todo.id !== Number(action.payload.id));
    //     }
    // }

    extraReducers: (builder) => {builder   // global state
        .addCase(getAsyncTodos.pending , (state) => {
            state.loading = true;
            state.todos = [];
            state.error = ""
        })
        .addCase(getAsyncTodos.fulfilled , (state , action) => {
            state.loading = false;
            state.todos = action.payload;
            state.error = ""
        })
        .addCase(getAsyncTodos.rejected , (state , action) => {
            state.loading = false;
            state.todos = [];
            state.error = action.payload
        })
        .addCase(addAsyncTodo.pending , (state) => {
            state.loading = true;
        })
        .addCase(addAsyncTodo.fulfilled , (state , action) => {
            state.loading = false;
            state.todos.push(action.payload);
            state.error = ""
        })
        .addCase(addAsyncTodo.rejected , (state , action) => {
            state.loading = false;
            state.todos = [];
            state.error.push(action.payload);
        })
        .addCase(toggleAsyncTodo.fulfilled , (state , action) => {
            const selectedTodo = state.todos.find((todo) => todo.id === Number(action.payload.id));
            selectedTodo.completed = action.payload.completed;
        })
        .addCase(deleteAsyncTodo.fulfilled , (state , action) => {
            state.todos = state.todos.filter((todo) => todo.id !== Number(action.payload.id));
        })
    }
});
export const { addTodo , toggleTodo , deleteTodo } = todoReducer.actions;
export default todoReducer.reducer;
