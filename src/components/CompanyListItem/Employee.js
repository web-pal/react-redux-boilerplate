import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { removeEmployeeCreator } from '../../actions/companyList';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  removeEmployee: PropTypes.func.isRequired,
  status: PropTypes.string
};

const Employee = ({ item, status, removeEmployee }) => (
  <li className="list-group-item">
    <span style={{ marginLeft: '20px', marginRight: '10px' }}>
      <span>
        {item.get('firstName')} {item.get('lastName')}
      </span>
      <span>{ status }</span>
      <button onClick={() => removeEmployee()}>Fire</button>
    </span>
  </li>
);

Employee.propTypes = propTypes;

function mapStateToProps({ companyList }, ownProps) {
  return {
    status: companyList.employeeStatus.get(ownProps.item.get('id'))
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    removeEmployee: () => dispatch(removeEmployeeCreator(ownProps.item.get('id'), ownProps.companyId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
