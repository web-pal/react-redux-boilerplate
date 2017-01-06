import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired
};

class CompaniesItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, owners } = this.props;
    return (
      <li>
        <span>
          {item.get('companyName')}
        </span>
      </li>
    );
  }
}

CompaniesItem.propTypes = propTypes;


export default CompaniesItem;