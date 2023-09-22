import "./Column.css"
import Task from "./Task"
import { shallow } from "zustand/shallow"
import { useStore } from "../store"
import { useState } from "react"

export default function Column({ state }) {

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state),
        shallow
    );

    const addTask = useStore((store) => store.addTask);

    return (
        <div className="column">
            <div className="title-wrapper">
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add Task</button>
            </div>
            {tasks.map((task) => <Task title={task.title} key={task.title} />)}
            {open && 
            <div className="modal">
                <div className="modal-content">
                    <input 
                        className="modal-input"
                        type="text" 
                        onChange={event => setText(event.target.value)} 
                        value={text}
                        placeholder="add a task"    
                    />
                    <div className="modal-buttons">
                    <button 
                        className="modal-button open" 
                        onClick={() => {
                            addTask(text, state);
                            setText("");
                            setOpen(false);
                        }}
                    >
                        Add
                    </button>
                    <button 
                        className="modal-button close" 
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}