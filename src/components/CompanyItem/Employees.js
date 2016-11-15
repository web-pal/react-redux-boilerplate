import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
};

const Employee = ({ item }) => (
  <li className="list-group-item">
    <span>
      {item.get('firstName')} {item.get('lastName')}
    </span>
  </li>
);

Employee.propTypes = propTypes;

export default Employee;
