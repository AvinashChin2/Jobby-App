import './index.css'

const UserProfileDetails = props => {
  const {userDetails} = props
  const {name, profileImageUrl, shortBio} = userDetails
  return (
    <div className="profile-container">
      <img src={profileImageUrl} alt="profile" className="profile-image" />
      <h1 className="username">{name}</h1>
      <p className="short-bio">{shortBio}</p>
    </div>
  )
}
export default UserProfileDetails
