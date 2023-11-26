import './index.css'

const TagItem = props => {
  const {activeTag, onClickTag, details} = props
  const isTagActive = activeTag === details.optionId
  const onSelectingTag = () => {
    onClickTag(details.optionId)
  }
  return (
    <li className="tag-cont">
      <button
        className={isTagActive ? 'color-btn' : 'outline-btn'}
        onClick={onSelectingTag}
        type="button"
      >
        {details.displayText}
      </button>
    </li>
  )
}
export default TagItem
