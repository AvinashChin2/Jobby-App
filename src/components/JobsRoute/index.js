import Header from '../Header'
import UserProfile from '../UserProfile'
import JobsList from '../JobsList'
import Filters from '../Filters'
import './index.css'

const JobsRoute = () => (
  <>
    <Header />
    <div className="jobs-page-container">
      <div className="main-container">
        <div className="left-container">
          <UserProfile />
          <hr className="line" />
          <Filters />
        </div>
        <div className="right-container">
          <JobsList />
        </div>
      </div>
    </div>
  </>
)
export default JobsRoute
