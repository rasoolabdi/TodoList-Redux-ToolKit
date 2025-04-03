import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../features/todo/todoSlice";


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
                        onChange={() => dispatch(toggleTodo({ id }))}
                    />
                    <span>{title}</span>
                </span>
                <button onClick={() => dispatch(deleteTodo({ id: id }))} className="btn btn-danger">Delete</button>
            </div>
        </li>
    )
};
export default TodoItem;