import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
};

const Employee = ({ item }) => (
  <span>
    {item.get('firstName')} {item.get('lastName')}
  </span>
);

Employee.propTypes = propTypes;

export default Employee;
