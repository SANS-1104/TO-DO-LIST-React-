import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TO-DO.css';

export default function TODO(){
    let [todo , settodo] = useState([{ task : "sample task", id : uuidv4() , isDone : false}]); // space created to add a new task
    let [newtodo, setnewtodo] = useState(""); // new task name

    // function to take a new task
    let addNewTask = () =>{
        if(newtodo == "") {
            alert("please add a task");
            return;
        }else{
            settodo( (prev)=>{
                return [...prev, {task : newtodo , id : uuidv4() , isDone : false}]
            } ); 
        }
        setnewtodo(""); // setting the input box empty        
    }

    // function to update (write) the new task
    let updateTodoVal = (event) =>{
        setnewtodo(event.target.value)
    }

    // function to add task using enter key
    let handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(newtodo == "") {
                alert("please add a task");
                return;
            }else addNewTask();
        }
    }

    let deleteToDo = (id)=>{
        settodo((prev) =>
            todo.filter((prev) => prev.id != id)
        );
    }

    let markOneDone = (id)=>{
        settodo((prev) =>
            prev.map((todo) =>{
                if(todo.id == id){
                    return{
                        ...todo , isDone : true
                    };
                }else return todo;
            })
        );
    }

    let markAllDone = ()=>{
        settodo((prev) =>
            prev.map((todo) =>{
                return{
                    ...todo , isDone : true
                }
            })
        );
    }

    let resetTasks = ()=>{
        settodo([{ task : "sample task", id : uuidv4() , isDone : false}]);
    }
   
    return(
        <>
            <h1>To Do List</h1>
            <input 
                type="text" 
                placeholder="Add a Task" 
                className="to-do-inp"  // for css
                value={newtodo} 
                onChange={updateTodoVal}
                onKeyDown={handleKeyDown}
            />
            <br /><br />
            <button type="submit" onClick={addNewTask} className='add-task-btn'>Add Task</button>
            <button type="reset" onClick={resetTasks} className='reset-btn'>Reset All</button>
            <br /><br />
            <button type="submit" onClick={markAllDone} className='mark-all-done'>Mark All Done</button>
            <br /><br /><hr />
            <ul>
                {
                    todo.map((todo)=>(
                        <li className='newTask' key={todo.id} >
                            <span style={todo.isDone ? {textDecoration : "line-through"} : {}}>{todo.task}</span>
                            <button type="submit" onClick={()=> deleteToDo(todo.id)} className='delTask'><i className="fa-solid fa-trash"></i></button>
                            <button type="submit" onClick={()=> markOneDone(todo.id)} className='mark-done'><i className="fa-solid fa-check"></i></button>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}