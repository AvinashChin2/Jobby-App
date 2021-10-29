import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItemPops from '../JobItemProps'
import SkillProps from '../SkillProps'
import LacProps from '../LacProps'
import SimilarJobsItem from '../SimilarJobsItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemDetails: {},
    similarJobsData: [],
    skills: [],
    lifeAtCompany: {},
    quantity: 1,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        title: fetchedData.job_details.title,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
      }
      const updatedSkills = fetchedData.job_details.skills.map(skill => ({
        skillImageUrl: skill.image_url,
        skillName: skill.name,
      }))
      const updatedLifeAtCompany = {
        lifeDescription: fetchedData.job_details.life_at_company.description,
        lifeImageUrl: fetchedData.job_details.life_at_company.image_url,
      }
      const updatedSimilarJobs = fetchedData.similar_jobs.map(similarJob => ({
        companyLogoUrl: similarJob.company_logo_url,
        employmentType: similarJob.employment_type,
        id: similarJob.id,
        jobDescription: similarJob.job_description,
        location: similarJob.location,
        rating: similarJob.rating,
        title: similarJob.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetails: updatedData,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        similarJobsData: updatedSimilarJobs,
      })
    }

    if (response.ok === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
      this.renderFailure()
    }
  }

  renderSuccess = () => {
    const {jobItemDetails, skills, lifeAtCompany, similarJobsData} = this.state
    return (
      <div className="detail-container">
        <div className="total-content">
          <JobItemPops jobFullDetails={jobItemDetails} skillDetails={skills} />
          <h1 className="skill-title">Skills</h1>
          <li className="all-skills">
            {skills.map(skill => (
              <SkillProps skillDetails={skill} />
            ))}
          </li>
          <h1 className="lac-title">Life at Company</h1>
          <li className="all-lac">
            <LacProps lacDetails={lifeAtCompany} />
          </li>
        </div>
        <div className="similar-job-container">
          <h1 className="similar-title">Similar Jobs</h1>
          <div className="similar-jobs-list">
            {similarJobsData.map(eachSimilar => (
              <SimilarJobsItem
                similarJobsDetails={eachSimilar}
                key={eachSimilar.id}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        we cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobItemDetails()}</div>
      </>
    )
  }
}
export default JobItemDetails
