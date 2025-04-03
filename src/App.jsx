import './App.css';
import AddTodoForm from './Todos/AddTodoForm'
import TodoList from './Todos/TodoList'

function App() {  
  return (
    <div className='container pt-3'>
      <h1 className='text-center'>TodoApp with Redux ToolKit</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  )
};

export default App;
