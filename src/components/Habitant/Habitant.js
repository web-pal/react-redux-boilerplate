import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  habitants: ImmutablePropTypes.list.isRequired
};

const Habitant = ({ habitants, ids }) =>
  <span>
    {habitants.map(habitant =>
      <li className="list-group-item" key={habitant.get('id')}>
        {`${habitant.get('firstName')} ${habitant.get('lastName')}`}
      </li>
    )}
  </span>;

Habitant.propTypes = propTypes;

export default Habitant;

