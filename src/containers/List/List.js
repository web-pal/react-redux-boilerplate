import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import faker from 'faker';

import * as ListActions from '../../actions/list';
import ListItem from '../../components/ListItem/ListItem';


const propTypes = {
  getList: PropTypes.func.isRequired,
  addItemToList: PropTypes.func.isRequired,
  removeItemFromList: PropTypes.func.isRequired,
  editItemInList: PropTypes.func.isRequired,
  list: ImmutablePropTypes.list.isRequired,
  listIsLoading: PropTypes.bool.isRequired,
  listAddIsLoading: PropTypes.bool.isRequired
};


class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.addItemToList = this.addItemToList.bind(this);
    this.removeItemFromList = this.removeItemFromList.bind(this);
  }

  componentWillMount() {
    this.props.getList();
  }

  addItemToList() {
    return this.props.addItemToList({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      ...ListActions.listDefaults
    });
  }

  removeItemFromList(itemId) {
    return () => {
      this.props.removeItemFromList(itemId);
    };
  }

  render() {
    const { listIsLoading, listAddIsLoading, list, editItemInList } = this.props;
    return (
      <ul className="list-group" style={{ textAlign: 'center' }}>
        {listIsLoading ?
          <h1>List is loading...</h1> :
          <div>
            <button onClick={this.addItemToList}>
              {listAddIsLoading ?
                <span>In process...</span> :
                <span>Add new item</span>
              }
            </button>
            {list.map(id =>
              <ListItem
                key={id}
                id={id}
                editItemInList={editItemInList}
                removeItemFromList={this.removeItemFromList(id)}
              />
            )}
          </div>
        }
      </ul>
    );
  }
}


ListContainer.propTypes = propTypes;

function mapStateToProps({ list }) {
  return {
    listIsLoading: list.meta.get('fetching'),
    listAddIsLoading: list.meta.get('addInProcess'),
    list: list.allIds
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
