import "./Column.css"
import Task from "./Task"
import { shallow } from "zustand/shallow"
import { useStore } from "../store"
import { useState } from "react"
import classNames from "classnames"

export default function Column({ state }) {

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)
    const [drop, setDrop] = useState(false)

    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state),
        shallow
    );

    const addTask = useStore((store) => store.addTask);

    const setDraggedTask = useStore((store) => store.setDraggedTask)
    const draggedTask = useStore((store) => store.draggedTask)
    const moveTask = useStore((store) => store.moveTask)

    return (
        <div 
            className={classNames("column", { drop: drop })} 
            onDragOver={(event) => {
                setDrop(true);
                event.preventDefault()
            }}
            onDragLeave={(event) => {
                setDrop(false);
                event.preventDefault();
            }}
            onDrop={() => {
                setDrop(false);
                moveTask(draggedTask, state);
                setDraggedTask(null);
            }}
        >
            <div className="title-wrapper">
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add Task</button>
            </div>
            
            {/* render tasks */}
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