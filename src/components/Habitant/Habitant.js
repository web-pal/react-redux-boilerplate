import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { getHabitants } from '../../utils/selectors';

const propTypes = {
  habitants: ImmutablePropTypes.list.isRequired
};

class Habitant extends Component {
  render() {
    console.log('habitant', this.props);
    const { habitants } = this.props;
    return (
      <ul className="list-group-item">{habitants
        .map(item =>
          <li className="list-group-item" key={item.get('id')}>
            Habitant: {item.get('firstName')} {item.get('lastName')}
          </li>)}
      </ul>
    );
  }
}

Habitant.propTypes = propTypes;

function mapStateToProps({ citiesList }, props) {
  return {
    habitants: getHabitants(citiesList, props)
  };
}

export default connect(mapStateToProps)(Habitant);
