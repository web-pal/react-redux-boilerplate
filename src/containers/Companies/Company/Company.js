import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as CompaniesActions from '../../../actions/companies';
import Employee from '../../../components/Employee/Employee';
import { getCompanyWithEmployees } from '../../../utils/selectors';


const propTypes = {
  company: ImmutablePropTypes.map.isRequired
};

const Company = ({ company }) =>
  <li>
    {company.get('companyName')}&nbsp;---&nbsp;
    {company.get('employees').toList().map(employee => employee &&
      <Employee
        key={employee.get('id')}
        item={employee}
      />
    )}
  </li>;

Company.propTypes = propTypes;

function mapStateToProps({ companies, employees }, props) {
  return {
    company: getCompanyWithEmployees({ companies, employees, props })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
