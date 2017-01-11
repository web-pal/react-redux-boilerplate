import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import faker from 'faker';

import * as CompaniesActions from '../../actions/companies';
import { getCompanies, getCompanyEmployees } from '../../utils/selectors';
import Company from '../../components/Company/Company';

const propTypes = {
  getCompanies: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  addCompaniesItem: PropTypes.func.isRequired,
  companies: ImmutablePropTypes.list.isRequired
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

  componentDidMount() {
    this.props.getCompanies();
  }

  addCompaniesItem() {
    return this.props.addCompaniesItem({
      companyName: faker.company.companyName(),
      employees: generateEmployees(6)
    });
  }

  render() {
    const { companies, getEmployees } = this.props;
    return (
      <div>
        <button
          style={{ marginLeft: '40px' }}
          onClick={this.addCompaniesItem}
        >
          Add company
        </button>
        <ul>
          {companies.map(item => item &&
            <Company
              key={item.get('id')}
              employees={
                getEmployees(
                  `${item.get('id')}_${item.get('employees').size}`,
                  item.get('employees')
                )
              }
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
    companies: getCompanies(companies),
    getEmployees: getCompanyEmployees(employees)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CompaniesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesContainer);
