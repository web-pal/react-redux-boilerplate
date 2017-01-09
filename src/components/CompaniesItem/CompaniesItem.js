import React from 'react';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import * as CompaniesActions from '../../actions/companies';
import { getEmployees } from '../../utils/selectors';
import Employee from './Employee';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  employees: ImmutablePropTypes.list.isRequired
};

const CompaniesItem = ({ item, employees }) =>
  <li>
    {item.get('companyName')}&nbsp;---&nbsp;
    {employees.map(employee =>
      <Employee
        key={employee.get('id')}
        item={employee}
      />
    )}
  </li>;

CompaniesItem.propTypes = propTypes;

function mapStateToProps({ companies }, props) {
  return {
    employees: getEmployees(companies, props)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesItem);
