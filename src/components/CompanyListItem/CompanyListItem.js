import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Employee from './Employee';
import { toggleEmployee } from '../../actions/companyList';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  showEmployee: ImmutablePropTypes.map.isRequired,
  employee: ImmutablePropTypes.map.isRequired,
  toggleEmployeeFunc: PropTypes.func.isRequired
};

const CompanyListItem = ({ item, showEmployee, employee, toggleEmployeeFunc }) => (
  <li className="list-group-item">
    <span style={{ marginLeft: '10px', marginRight: '10px' }}>
      <span>
        {item.get('companyName')}
      </span>
      <button onClick={() => toggleEmployeeFunc()} >{ showEmployee ? 'Hide employee' : 'Show employee' }</button>
      <ul>
        {
          showEmployee ? employee.map(emp => <Employee key={emp.get('id')} item={emp} />) : ''
        }
      </ul>
    </span>
  </li>
);

CompanyListItem.propTypes = propTypes;

function mapStateToProps({ companyList }, ownProps) {
  const employeeList = ownProps.item.get('employee');
  return {
    showEmployee: companyList.showEmployee.get(ownProps.item.get('id')),
    employee: employeeList.map(emp => companyList.employee.get(emp))
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleEmployeeFunc: () => dispatch(toggleEmployee(ownProps.item.get('id')))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListItem);
