import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsItem = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsDetails
  return (
    <div className="similar-job-card">
      <div className="title-container">
        <img src={companyLogoUrl} alt={title} className="similar-image" />
        <div className="title-rating-container">
          <h1 className="similar-name">{title}</h1>
          <div className="rating-container">
            <FaStar className="stars" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-description-container">
        <h1 className="similar-description">Description</h1>
        <p className="similar-para">{jobDescription}</p>
      </div>
      <div className="similar-location-container">
        <div className="location-container">
          <IoLocationSharp className="location-icon" />
          <p className="similar-location">{location}</p>
        </div>
        <div className="similar-employment-container">
          <BsBriefcaseFill className="employment-icon" />
          <p className="similar-employment">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}
export default SimilarJobsItem
