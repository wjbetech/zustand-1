import "./Task.css"

const STATUS = "PLANNED"

export default function Task({ title }) {
    return (
        <div className="task">
            <div>{title}</div>
            <div className="bottom-wrapper">
                <div></div>
                <div className="status">{STATUS}</div>
            </div>
        </div>
    )
}