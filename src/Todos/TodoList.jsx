import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { getAsyncTodos } from "../features/todo/todoSlice";

const  TodoList = () => {
    const { loading , todos , error } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsyncTodos())
    } , [dispatch]);

    return (
        <div>
            <h2>TodoList :</h2>
            {loading ? (<p>Loading ...</p>) : error ? ({ error }) : (
                <ul className="list-group">
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} { ... todo } />
                    ))}
                </ul>
            )}
        </div>
    )
};
export default TodoList;