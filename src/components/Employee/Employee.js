import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired
};

const Employee = ({ item }) =>
  <span>
    &nbsp;{item.get('firstName')}&nbsp;{item.get('lastName')},
  </span>;

Employee.propTypes = propTypes;

export default Employee;
