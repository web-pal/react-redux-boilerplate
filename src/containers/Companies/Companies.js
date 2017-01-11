import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import faker from 'faker';

import * as CompaniesActions from '../../actions/companies';
import { getListItems } from '../../utils/selectors';
import Company from './Company/Company';

const propTypes = {
  getCompanies: PropTypes.func.isRequired,
  addCompaniesItem: PropTypes.func.isRequired,
  companies: ImmutablePropTypes.map.isRequired
};

function generateEmployees(quantity) {
  const employees = [];
  for (let i = 0; i < quantity; i += 1) {
    employees.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    });
  }
  return employees;
}

class CompaniesContainer extends Component {
  constructor(props) {
    super(props);
    this.addCompaniesItem = this.addCompaniesItem.bind(this);
  }

  componentWillMount() {
    this.props.getCompanies();
  }

  addCompaniesItem() {
    return this.props.addCompaniesItem({
      companyName: faker.company.companyName(),
      employees: generateEmployees(6)
    });
  }

  render() {
    const { companies } = this.props;
    return (
      <div>
        <button onClick={this.addCompaniesItem}>Add company</button>
        <ul>
          {companies.toList().map(item => item &&
            <Company
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

function mapStateToProps({ companies, employees }) {
  return {
    companies: getListItems({ companies, employees })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesContainer);
