import { useDispatch } from "react-redux";
import { deleteAsyncTodo , toggleAsyncTodo } from "../features/todo/todoSlice";


function TodoItem({ id , title , completed }) {
    const dispatch = useDispatch();

    return (
        <li className={`list-group-item ${completed && "list-group-item-success"}`}>
            <div className="d-flex justify-content-between">
                <span className="d-flex align-items-center gap-3">
                    <input 
                        type="checkbox"
                        className="mr-3"
                        checked={completed}
                        onChange={() => dispatch(toggleAsyncTodo({ id , completed: !completed }))}
                    />
                    <span>{title}</span>
                </span>
                <button onClick={() => dispatch(deleteAsyncTodo({ id }))} className="btn btn-danger">Delete</button>
            </div>
        </li>
    )
};
export default TodoItem;