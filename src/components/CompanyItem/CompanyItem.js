import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Employees from './Employees';


const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  employeesList: PropTypes.object.isRequired
};


class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMode: false
    };
    // this.showItemsInList = this.showItemsInList.bind(this);
    this.setShowMode = this.setShowMode.bind(this);
  }

  setShowMode() {
    if (!this.state.showMode) {
      return this.setState({ showMode: true });
    }

    return this.setState({ showMode: false });
  }

  render() {
    const { item, employeesList } = this.props;
    const { showMode } = this.state;
    return (
      <li className="list-group-item">
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>
          <span>
            {showMode ?
              <div>
                <span><h3>{item.get('companyName')}</h3></span>
                <ul>
                  {employeesList.map(emp => <Employees key={emp.get('id')} item={emp} />)}
                </ul>
              </div> :
            item.get('companyName')
          }
          </span>
          {showMode ?
            <button onClick={this.setShowMode}>Hide</button> :
            <button onClick={this.setShowMode}>Show</button>
          }
        </span>
      </li>
    );
  }
}

ListItem.propTypes = propTypes;
function mapStateToProps({ companies }, ownProps) {
  const comp = ownProps.item.get('employees');
  return {
    employeesList: comp.map(emp => companies.employees.get(emp.toString()))
  };
}

export default connect(mapStateToProps)(ListItem);
