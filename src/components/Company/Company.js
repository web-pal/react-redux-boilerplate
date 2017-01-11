import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Employee from '../Employee/Employee';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  employees: ImmutablePropTypes.list.isRequired
};

const Company = ({ item, employees }) =>
  <li>
    {item.get('companyName')}&nbsp;---&nbsp;
    {employees.map(employee =>
      <Employee
        key={employee.get('id')}
        item={employee}
      />
    )}
  </li>;

Company.propTypes = propTypes;

export default Company;
