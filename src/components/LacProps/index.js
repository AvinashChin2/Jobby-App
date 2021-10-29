import './index.css'

const LacProps = props => {
  const {lacDetails} = props
  const {lifeDescription, lifeImageUrl} = lacDetails
  return (
    <li className="life-card">
      <p className="life-para">{lifeDescription}</p>
      <img src={lifeImageUrl} alt="life at company" className="life-image" />
    </li>
  )
}
export default LacProps
