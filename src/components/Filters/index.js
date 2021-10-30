import './index.css'

const Filters = props => {
  const renderTypeOfEmploymentList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(type => {
      const {changeActiveTypeOfEmployment, activeTypeOfEmployment} = props
      const onClickTypeOfEmployment = () =>
        changeActiveTypeOfEmployment(type.employmentTypeId)

      const typeOfEmploymentClassName =
        activeTypeOfEmployment === type.employmentTypeId
          ? 'category-name active-category-name'
          : 'category-name'

      return (
        <li
          key={type.employmentTypeId}
          className="category-item"
          onClick={onClickTypeOfEmployment}
        >
          <input
            type="checkbox"
            id={type.employmentTypeId}
            checked={activeTypeOfEmployment === type.employmentTypeId}
          />
          <label
            className={typeOfEmploymentClassName}
            htmlFor={type.employmentTypeId}
          >
            {type.label}
          </label>
        </li>
      )
    })
  }

  const renderTypeofEmployment = () => (
    <>
      <h1 className="employment-type-heading">Type Of Employment</h1>
      <ul className="employment-type-list">{renderTypeOfEmploymentList()}</ul>
    </>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeActiveSalaryRange, activeSalaryRange} = props

      const onClickSalaryRange = () =>
        changeActiveSalaryRange(salary.salaryRangeId)

      const salaryRangeClassName =
        activeSalaryRange === salary.salaryRangeId
          ? 'and-above active-salary'
          : 'and-above'

      return (
        <li
          className="salary-item"
          key={salary.salaryRangeId}
          onClick={onClickSalaryRange}
        >
          <input
            type="radio"
            id={salary.salaryRangeId}
            checked={activeSalaryRange === salary.salaryRangeId}
          />
          <label
            htmlFor={salary.salaryRangeId}
            className={salaryRangeClassName}
          >
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul className="salary-range-list">{renderSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderTypeofEmployment()}
      <hr className="hr-filter" />
      {renderSalaryRange()}
    </div>
  )
}

export default Filters
