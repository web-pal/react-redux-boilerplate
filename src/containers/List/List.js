import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import faker from 'faker';

import * as ListActions from '../../actions/list';
import { getList } from '../../utils/selectors';
import ListItem from '../../components/ListItem/ListItem';


const propTypes = {
  getList: PropTypes.func.isRequired,
  addItemToList: PropTypes.func.isRequired,
  removeItemFromList: PropTypes.func.isRequired,
  editItemFromList: PropTypes.func.isRequired,
  list: ImmutablePropTypes.list.isRequired,
  listIsLoading: PropTypes.bool.isRequired
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
      ...ListActions.schemas.list.getDefaults()
    });
  }

  removeItemFromList(itemId) {
    return () => {
      this.props.removeItemFromList(itemId);
    };
  }

  render() {
    const { listIsLoading, list, editItemFromList } = this.props;

    return (
      <ul className="list-group" style={{ textAlign: 'center' }}>
        {listIsLoading ?
          <h1>List is loading...</h1> :
          <div>
            <button onClick={this.addItemToList}>
              Add new item
            </button>
            {list.map(item =>
              <ListItem
                key={item.get('id')}
                item={item}
                editItemFromList={editItemFromList}
                removeItemFromList={this.removeItemFromList(item.get('id'))}
              />
            )}
          </div>
        }
      </ul>
    );
  }
}


ListContainer.propTypes = propTypes;

function mapStateToProps({ list, ui }) {
  return {
    listIsLoading: ui.get('listIsLoading'),
    list: getList(list)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
