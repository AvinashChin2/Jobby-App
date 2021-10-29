import {Component} from 'react'
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

class Filters extends Component {
  state = {activeOption: ''}

  render() {
    const {label, employmentTypeId} = {
      salaryRangesList,
      employmentTypesList,
    }
    return (
      <div className="filter-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="employment-container">
          {employmentTypesList.map(eachItem => (
            <li className="filter-list-container">
              <label htmlFor={eachItem.employmentTypeId} className="label-name">
                <input
                  type="checkbox"
                  id={eachItem.employmentTypeId}
                  className="check-box"
                />
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="salary-container">
          {salaryRangesList.map(eachSal => (
            <li className="filter-list-container">
              <label className="label-name" value={eachSal.employmentTypeId}>
                <input
                  type="radio"
                  value={eachSal.employmentTypeId}
                  name="options"
                  className="radio-circle"
                />
                {eachSal.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default Filters
