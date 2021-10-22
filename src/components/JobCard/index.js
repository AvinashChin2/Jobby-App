import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails

  return (
    <div className="card-container">
      <div className="title-container">
        <img src={companyLogoUrl} alt={title} className="logo-image" />
        <div className="title-rating-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <FaStar className="stars" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-emp-sal">
        <div className="location-employment-container">
          <div className="location">
            <IoLocationSharp className="location-icon" />
            <p className="location-name">{location}</p>
          </div>
          <div className="employment">
            <BsBriefcaseFill className="employment-icon" />
            <p className="employment-name">{employmentType}</p>
          </div>
        </div>
        <div className="package-container">
          <p className="package">{packagePerAnnum}</p>
        </div>
      </div>
      <hr className="line" />
      <div className="description-container">
        <p className="description-title">Description</p>
        <p className="job-description">{jobDescription}</p>
      </div>
    </div>
  )
}
export default JobCard
