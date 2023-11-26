import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from '../TagItem'
import TaskItem from '../TaskItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Home extends Component {
  state = {
    inputTask: '',
    inputTag: tagsList[0].optionId,
    activeTag: '',
    taskList: [],
    isActive: false,
  }

  onTypeTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onSelectTag = event => {
    this.setState({
      inputTag: event.target.value,
    })
  }

  onAddTask = event => {
    event.preventDefault()
    const {inputTask, inputTag} = this.state
    if (inputTask === '' || inputTag === '') {
      this.setState(prevState => ({
        taskList: [...prevState.taskList],
      }))
    } else {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, {task: inputTask, tag: inputTag}],
        inputTask: '',
        inputTag: tagsList[0].optionId,
      }))
    }
  }

  onClickTag = uniqueId => {
    const {isActive} = this.state
    if (isActive) {
      this.setState(prevState => ({
        isActive: !prevState.isActive,
        activeTag: '',
      }))
    } else {
      this.setState(prevState => ({
        isActive: !prevState.isActive,
        activeTag: uniqueId,
      }))
    }
  }

  render() {
    const {inputTask, inputTag, taskList, activeTag, isActive} = this.state
    const filteredTasksList = taskList.filter(
      eachTask => eachTask.tag === activeTag,
    )
    return (
      <div className="bg-cont">
        <div className="first-cont">
          <form onSubmit={this.onAddTask} className="form-cont">
            <h1 className="main-head">Create a task!</h1>
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              id="task"
              className="input"
              type="text"
              onChange={this.onTypeTask}
              value={inputTask}
              placeholder="Enter the task here"
            />
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <select
              name="tags"
              id="tag"
              value={inputTag}
              onChange={this.onSelectTag}
              className="input"
            >
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId} key={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="second-cont">
          <h1 className="second-head">Tags</h1>
          <ul className="tags-list-cont">
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                activeTag={activeTag}
                details={eachTag}
                onClickTag={this.onClickTag}
              />
            ))}
          </ul>

          <h1 className="second-head">Tasks</h1>
          {taskList.length === 0 ? (
            <p className="empty-txt">No Tasks Added Yet</p>
          ) : (
            <>
              {isActive ? (
                <ul className="tasks-list-cont">
                  {filteredTasksList.map(eachTask => (
                    <TaskItem key={uuidv4()} details={eachTask} />
                  ))}
                </ul>
              ) : (
                <ul className="tasks-list-cont">
                  {taskList.map(eachTask => (
                    <TaskItem key={uuidv4()} details={eachTask} />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}
export default Home
