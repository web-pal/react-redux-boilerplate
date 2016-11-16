import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Employees from './Employees';
import { removeEmployeeCreator } from '../../actions/companyList';
import { getEmployeesList } from '../../utils/selectors';


const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  employees: PropTypes.object.isRequired,
  removeEmployee: PropTypes.func.isRequired
};


class CompanyListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMode: false
    };

    this.setShowMode = this.setShowMode.bind(this);
  }

  setShowMode() {
    if (!this.state.showMode) {
      return this.setState({ showMode: true });
    }

    return this.setState({ showMode: false });
  }

  render() {
    const { item, employees, removeEmployee } = this.props;
    const { showMode } = this.state;
    return (
      <li className="list-group-item">
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>
          <span>{item.get('companyName')}</span>
          {showMode ?
            <button
              style={{ marginLeft: '10px' }}
              onClick={this.setShowMode}
            >
              Hide
            </button> :
            <button
              style={{ marginLeft: '10px' }}
              onClick={this.setShowMode}
            >
              Show
            </button>
          }
          {showMode ?
            <ul>
              {employees.map(emp =>
                <li className="list-group-item" key={emp.get('id')}>
                  <Employees
                    item={emp}
                    removeItemId={emp.get('id')}
                  />
                  <button
                    onClick={() => removeEmployee(emp.get('id'))}
                  >
                    Delete
                  </button>
                </li>
              )}
            </ul> : ''
        }
        </span>
      </li>
    );
  }
}

CompanyListItem.propTypes = propTypes;

function mapStateToProps({ companies }, ownProps) {
  return {
    employees: getEmployeesList(companies, ownProps)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    removeEmployee: emp => dispatch(removeEmployeeCreator(ownProps.item.get('id'), emp))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListItem);
