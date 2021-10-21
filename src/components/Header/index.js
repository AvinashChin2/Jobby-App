import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <ul className="nav-items">
        <Link to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </li>
        </Link>
        <div className="nav-content">
          <Link to="/" className="nav-link">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="list-item">Jobs</li>
          </Link>
        </div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
