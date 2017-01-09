import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as CompaniesActions from '../../actions/companies';
import { getCompanies } from '../../utils/selectors';
import CompaniesItem from './CompaniesItem';

const propTypes = {
  getCompanies: PropTypes.func.isRequired,
  addCompaniesItem: PropTypes.func.isRequired,
  companies: ImmutablePropTypes.list.isRequired
};

class CompaniesContainer extends Component {
  componentWillMount() {
    this.props.getCompanies();
  }

  render() {
    const { companies, addCompaniesItem } = this.props;
    return (
      <div>
        <button onClick={addCompaniesItem}>Add company</button>
        <ul>
          {companies.map(item =>
            <CompaniesItem
              key={item.get('id')}
              item={item}
            />
          )}
        </ul>
      </div>
    );
  }
}

CompaniesContainer.propTypes = propTypes;

function mapStateToProps({ companies }) {
  return {
    companies: getCompanies(companies)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesContainer);
