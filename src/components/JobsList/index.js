import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import UserProfile from '../UserProfile'
import Filters from '../Filters'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

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
    activeTypeOfEmployment: '',
    activeSalaryRange: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeTypeOfEmployment, activeSalaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeTypeOfEmployment}&minimum_package=${activeSalaryRange}&search=${searchInput}`
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

  onClickRetry = () => {
    this.setState(
      {
        activeTypeOfEmployment: '',
        activeSalaryRange: '',
        searchInput: '',
      },
      this.getJobDetails,
    )
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
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
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
    const {jobsList, searchInput} = this.state
    const searchResults = jobsList.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const quantityList = jobsList.length > 0

    return quantityList ? (
      <ul className="cards-list">
        {searchResults.map(eachData => (
          <JobCard jobCardDetails={eachData} key={eachData.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-para">
          We could not found any jobs.Try other filters
        </p>
      </div>
    )
  }

  changeActiveTypeOfEmployment = activeTypeOfEmployment => {
    this.setState({activeTypeOfEmployment}, this.getJobsList)
  }

  changeActiveSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobsList)
  }

  enterSearchInput = () => {
    this.getJobDetails()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickButton = () => {
    const {searchInput, jobsList} = this.state
    const searchResults = jobsList.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="cards-list">
        {searchResults.map(job => (
          <JobCard jobCardDetails={job.name} key={job.id} />
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

  render() {
    const {searchInput, activeSalaryRange, activeTypeOfEmployment} = this.state
    return (
      <div className="main-container">
        <div className="left-container">
          <UserProfile />
          <hr className="line" />
          <Filters
            activeSalaryRange={activeSalaryRange}
            activeTypeOfEmployment={activeTypeOfEmployment}
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            changeActiveSalaryRange={this.changeActiveSalaryRange}
            changeActiveTypeOfEmployment={this.changeActiveTypeOfEmployment}
          />
        </div>
        <div className="right-container">
          <div className="jobs-list-container-main">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input-box"
                value={searchInput}
                onChange={this.onChangeInput}
              />
              <button
                className="search-icon"
                type="button"
                testid="searchButton"
                onClick={this.getJobsList}
              >
                <AiOutlineSearch className="icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}
export default JobsList
