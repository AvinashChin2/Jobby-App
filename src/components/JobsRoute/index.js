import Header from '../Header'
import JobsList from '../JobsList'
import './index.css'

const JobsRoute = () => (
  <>
    <Header />
    <div className="jobs-page-container">
      <div className="main-container">
        <JobsList />
      </div>
    </div>
  </>
)
export default JobsRoute
