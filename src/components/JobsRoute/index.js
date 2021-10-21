import Header from '../Header'
import UserProfile from '../UserProfile'
import './index.css'

const JobsRoute = () => (
  <>
    <Header />
    <div className="jobs-page-container">
      <div className="main-container">
        <div className="left-container">
          <UserProfile />
        </div>
      </div>
    </div>
  </>
)
export default JobsRoute
