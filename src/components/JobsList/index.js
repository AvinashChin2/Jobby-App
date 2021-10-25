import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsList extends Component {
  state = {
    searchInput: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updatedData)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })

      if (response.status === 404) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    }
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="para-failure">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" type="button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobsList} = this.state

    return (
      <ul className="cards-list">
        {jobsList.map(eachData => (
          <JobCard jobCardDetails={eachData} key={eachData.id} />
        ))}
      </ul>
    )
  }

  renderJobsList = () => {
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

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickButton = () => {
    const {searchInput, jobsList} = this.state
    const searchResults = jobsList.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(searchResults)
    return (
      <ul className="cards-list">
        {searchResults.map(job => (
          <JobCard jobCardDetails={job} key={job.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-list-container-main">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            className="input-box"
            testid="searchButton"
            value={searchInput}
            onChange={this.onChangeInput}
          />
          <button
            className="search-icon"
            type="button"
            onClick={this.onClickButton}
          >
            <AiOutlineSearch className="icon" />
          </button>
        </div>
        {this.renderJobsList()}
      </div>
    )
  }
}
export default JobsList
