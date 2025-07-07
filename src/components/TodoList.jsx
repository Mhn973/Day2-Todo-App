import React, { useEffect } from "react";
import { useState } from "react";
import { XMarkIcon,CheckIcon ,PencilIcon} from "@heroicons/react/24/solid";
import {v4 as uuidv4} from 'uuid';
import IconButton from "./IconButton";
export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTask,setEditingTask]=useState({});
  

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  
  }, []);

  useEffect(() => {
    if (tasks.length>0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  const addTask = () => {
    if (inputValue.trim() && !tasks.some((task) => task.value === inputValue.trim())) {
      const newValue={
        id:uuidv4(),
        value:inputValue.trim(),
        completed: false
      }
      setTasks([...tasks, newValue]);
      setInputValue("");
      
    }

  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    
  };
  const handleCompleteChange = (id) => {
    
    
    setTasks(tasks.map(task=>{if(task.id===id){return{...task,completed:!task.completed}}else{return task}}))
  }
  const handleEdit=(task)=>
  {
    
    setEditingTask(task);
  }
  const handleUpdateTask=(editTask)=>
  {
    
    setTasks(tasks.map((task)=>{if(task.id===editTask.id){return editTask} else {return task}}))
      setEditingTask({})
  }
  const setEditValue=(inputValue)=>
  {
    const newValue={...editingTask,value:inputValue.trim()}
    setEditingTask(newValue);
    
  }
  return (
    <>
      <div className="w-full max-w-md h-96 flex flex-col items-center justify-center rounded shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <div className="flex flex-row justify-evenly w-full p-4">
          <input
            type="text"
            className="border border-gray-700 rounded-lg p-2 h-10 w-1/2"
            placeholder="Add a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            className="bg-blue-500  h-10 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={addTask}
            title="Add Task"
          >
            Add Task
          </button>
        </div>
        <ul className="overflow-y-auto h-64 w-full mt-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className={`py-2 w-full px-4 border-gray-700 flex justify-between  hover:bg-gray-300 transition-colors duration-200${
                  task.completed
                    ? "  bg-green-200 hover:bg-green-400 text-gray-500"
                    : ""
                }`}
              >
                {editingTask.id === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingTask.value}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleUpdateTask(editingTask)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUpdateTask(editingTask)
                      }
                      autoFocus
                      className="flex-1 mr-2 border border-gray-400 rounded px-2 py-1"
                    />

                    <IconButton
                      Icon={CheckIcon}
                      Variant="nuetral"
                      Size="md"
                      Click={() => handleUpdateTask(editingTask)}
                      Title="Update Task"
                      hoverVariant="nuetral"
                    />
                  </>
                ) : (
                  <>
                    <span>{task.value}</span>
                    <div>
                      <IconButton
                        Icon={PencilIcon}
                        Variant="nuetral"
                        Size="md"
                        Click={() => handleEdit(task)}
                        Title="Edit Task"
                        hoverVariant="nuetral"
                      />

                      <IconButton
                        Icon={CheckIcon}
                        Variant={`${task.completed ? "success" : "nuetral"}`}
                        Size="md"
                        Click={() => handleCompleteChange(task.id)}
                        Title="Edit Task"
                        hoverVariant="nuetral"
                      />
                     
                      <IconButton
                        Icon={XMarkIcon}
                        Variant= "nuetral"
                        Size="md"
                        Click={() => deleteTask(task.id)}
                        Title="Delete Task"
                        hoverVariant="fail"
                      />
                    </div>
                  </>
                )}

                {/* <XMarkIcon className="h-5 w-5 inline-block ml-2 cursor-pointer text-gray-400 hover:text-red-500" onClick={() => deleteTask(task.id)} /> */}
              </li>
            ))
          ) : (
            <div className="text-gray-500">No tasks available</div>
          )}
        </ul>
      </div>
    </>
  );
}
