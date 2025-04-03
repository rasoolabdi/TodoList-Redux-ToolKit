import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";


const AddTodoForm = () => {
    const [value , setValue] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!value) return;
        dispatch(addTodo({ title: value }));
        setValue("");
    };

    return (
        <form className="form-inline mt-3 mb-4" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary mt-1">افزودن</button>
        </form>
    )
};
export default AddTodoForm;