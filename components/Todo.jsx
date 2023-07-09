import { useState,useEffect } from "react"
import Item from "./Item";
import { nanoid } from "nanoid";
export default function AddTodo() {

    const [todos,setTodos] = useState(()=>JSON.parse(localStorage.getItem("todos"))||[])
    const [inputValue, setInputValue] = useState('')

    function addTask(){
        if(inputValue){
            const newTask ={
                id: nanoid(),
                body : inputValue,
                isDone :false
            }
            setTodos(prevTasks =>[newTask, ...prevTasks])
            setInputValue('')
        }
    }
    function deleteTask (id){
        setTodos(oldTodos=>oldTodos.filter(todo=>todo.id !==id))
    }
    function checkTask (id){
        setTodos(oldTodos=>oldTodos.map(todo=>{
            return todo.id === id ?{...todo,isDone:!todo.isDone} :todo
          }))
    }
//edit task here
    const elements = todos.map(task=><Item key={task.id}
                                           id={task.id}
                                           task ={task.body}
                                           deleteTask={deleteTask}
                                           isDone={task.isDone}
                                           checkTask={checkTask}/>)
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))
    },[todos])                                       
  return (
    <div className="container">
    <nav className="navbar">
        <input type="text" 
        placeholder='add task to do' 
        value={inputValue} 
        onChange={event => setInputValue(event.target.value)} />
        <button onClick={addTask}><ion-icon name="add"></ion-icon></button>
    </nav>
    <main className="tasks">
        <h1>Hello</h1>
        {todos.length>0?elements:<div> Add to do tasks</div>}
    </main>
    </div>
  )
}
