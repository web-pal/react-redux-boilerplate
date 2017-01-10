import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { getHabitants } from '../../utils/selectors';

const propTypes = {
  habitants: ImmutablePropTypes.list.isRequired
};

const Habitant = ({ habitants }) =>
  <span>
    {habitants.map(item =>
      <li className="list-group-item" key={item.get('id')}>
        Habitant: {item.get('firstName')} {item.get('lastName')}
      </li>)}
  </span>;

Habitant.propTypes = propTypes;

function mapStateToProps({ citiesList }, props) {
  return {
    habitants: getHabitants(citiesList, props)
  };
}

export default connect(mapStateToProps)(Habitant);
