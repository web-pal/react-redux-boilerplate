import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  habitants: ImmutablePropTypes.list.isRequired,
  uids: ImmutablePropTypes.list.isRequired
};

const Habitants = ({ habitants, uids }) =>
  <span>
    {habitants.filter(u => uids
      .includes(u.get('id')))
      .map(user =>
        <li className="list-group-item" key={user.get('id')}>
          {user.get('firstName')} {user.get('lastName')}
        </li>
    )}
  </span>;

Habitants.propTypes = propTypes;

export default Habitants;

