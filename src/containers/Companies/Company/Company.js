import React from 'react';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import * as CompaniesActions from '../../../actions/companies';
import Employee from '../../../components/Employee/Employee';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
};

const Company = ({ item }) =>
  <li>
    {item.get('companyName')}&nbsp;---&nbsp;
    {item.get('employees').toList().map(employee => employee &&
      <Employee
        key={employee.get('id')}
        item={employee}
      />
    )}
  </li>;

Company.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(null, mapDispatchToProps)(Company);
