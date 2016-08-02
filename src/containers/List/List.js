import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ListActions from '../../actions/list';
import ListLoader from '../../components/ListLoader/ListLoader';

const propTypes = {
  getList: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  quantity: PropTypes.number,
  isFetching: PropTypes.bool
};


class ListContainer extends Component {
  componentWillMount() {
    this.props.getList(100);
  }

  render() {
    return (
      <ul className="list-group" style={{ textAlign: 'center' }}>
        {this.props.isFetching &&
          Array.apply({ length: this.props.quantity }).map((item, key) =>
            (<ListLoader key={key} />)
          )
        }

        {this.props.list.map((item) =>
          <li key={item.id} className="list-group-item">{item.firstName} {item.lastName}</li>
        )}
      </ul>
    );
  }
}


ListContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    list: state.list.list,
    quantity: state.list.quantity,
    isFetching: state.list.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
