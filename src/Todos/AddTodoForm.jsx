import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodo } from "../features/todo/todoSlice";


const AddTodoForm = () => {
    const [value , setValue] = useState("");
    const { loading } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!value) return;
        // dispatch(addTodo({ title: value }));  // local state
        dispatch(addAsyncTodo({ title: value }));  // global state
        setValue("");
    };

    return (
        <form className={`${loading ? "opacity-50" : "opacity-100"} form-inline mt-3 mb-4`} onSubmit={handleSubmit}>
            <label className="mb-1" htmlFor="name">نام :</label>
            <input 
                autoComplete="off"
                id="name"
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Add Todo ..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-1" disabled={loading}>
                {loading ? "... لطفا کمی صبر کنید .در حال افزودن" : "افزودن"}
            </button>
        </form>
    )
};
export default AddTodoForm;