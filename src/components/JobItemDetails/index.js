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
    isLoading: false,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
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
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
      this.renderFailureView()
    }
  }

  renderSuccess = () => {
    const {
      jobItemDetails,
      skills,
      lifeAtCompany,
      similarJobsData,
      isLoading,
    } = this.state
    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <div className="detail-container">
        <ul className="total-content">
          <JobItemPops jobFullDetails={jobItemDetails} skillDetails={skills} />
          <h1 className="skill-title">Skills</h1>
          <ul className="all-skills">
            {skills.map(skill => (
              <SkillProps skillDetails={skill} key={skill.id} />
            ))}
          </ul>
          <h1 className="lac-title">Life at Company</h1>
          <ul className="all-lac">
            <LacProps lacDetails={lifeAtCompany} />
          </ul>
        </ul>
        <div className="similar-job-container">
          <h1 className="similar-title">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(eachSimilar => (
              <SimilarJobsItem
                similarJobsDetails={eachSimilar}
                key={eachSimilar.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
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
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="detail-container">{this.renderJobItemDetails()}</div>
      </>
    )
  }
}
export default JobItemDetails
