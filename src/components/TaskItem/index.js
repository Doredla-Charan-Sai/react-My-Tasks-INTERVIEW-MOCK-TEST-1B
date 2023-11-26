import './index.css'

const TaskItem = props => {
  const {details} = props
  const {task, tag} = details
  return (
    <li className="task-item">
      <p className="task-txt">{task}</p>
      <p className="color-tag">
        {tag[0] + tag.slice((1: tag.length)).toLowerCase()}
      </p>
    </li>
  )
}
export default TaskItem
