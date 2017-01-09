import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired
};

class Employee extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <span>
        &nbsp;{item.get('firstName')}&nbsp;{item.get('lastName')},
      </span>
    );
  }
}

Employee.propTypes = propTypes;

export default Employee;