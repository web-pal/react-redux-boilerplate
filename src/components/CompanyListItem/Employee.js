import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
};

const Employee = ({ item }) => (
  <li className="list-group-item">
    <span style={{ marginLeft: '20px', marginRight: '10px' }}>
      <span>
        {item.get('firstName')} {item.get('lastName')}
      </span>
    </span>
  </li>
);

Employee.propTypes = propTypes;

export default Employee;
