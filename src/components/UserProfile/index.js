import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserProfileDetails from '../UserProfileDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data= await response.json()
    const fetchedData = 

  renderDetails = () => {
    const {profileDetails} = this.state
    return (
      <div>
        {profileDetails.map(profile => (
          <UserProfileDetails userDetails={profile} />
        ))}
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <button className="retry-button" type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderUserProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render(){
      <div>{this.renderUserProfileDetails()}</div>
  }
}
export default UserProfile
