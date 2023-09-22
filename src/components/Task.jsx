import "./Task.css"
import classNames from "classnames"
import { useStore } from "../store"


export default function Task({ title }) {

    const task = useStore((store) =>
        store.tasks.find((task) => task.title === title)
    );

    const deleteTask = useStore((store) => store.deleteTask)

    const setDraggedTask = useStore((store) => store.setDraggedTask)

    return (
        <div 
            className="task" 
            draggable
            onDragStart={setDraggedTask(task.title)}
        >
            <div>{task.title}</div>
            <div className="bottom-wrapper">
                <div className="delete-button">
                    <i className='bx bx-x'onClick={() => deleteTask(task.title)}></i>
                </div>
                <div className={classNames("status", task.state)}>{task.state}</div>
            </div>
        </div>
    )
}