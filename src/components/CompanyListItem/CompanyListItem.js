import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Employee from './Employee';
import { toggleEmployee } from '../../actions/companyList';
import { getEmployeeList } from '../../utils/selectors';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  showEmployee: PropTypes.bool.isRequired,
  employee: ImmutablePropTypes.list.isRequired,
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
          showEmployee ? employee.map(emp => <Employee key={emp.get('id')} item={emp} companyId={item.get('id')} />) : ''
        }
      </ul>
    </span>
  </li>
);

CompanyListItem.propTypes = propTypes;

function mapStateToProps({ companyList }, ownProps) {
  return {
    showEmployee: companyList.showEmployee.get(ownProps.item.get('id')),
    employee: getEmployeeList(companyList, ownProps)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleEmployeeFunc: () => dispatch(toggleEmployee(ownProps.item.get('id')))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListItem);
