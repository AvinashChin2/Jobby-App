import './index.css'

const SkillProps = props => {
  const {skillDetails} = props
  const {skillImageUrl, skillName} = skillDetails
  return (
    <div className="skill-card-container">
      <img src={skillImageUrl} alt={skillName} className="skill-image" />
      <h1 className="skill-name">{skillName}</h1>
    </div>
  )
}
export default SkillProps
