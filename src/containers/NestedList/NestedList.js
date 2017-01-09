import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ListActions from '../../actions/nestedList';
import {getNestedUsersList} from '../../utils/selectors';
import NestedListItem from '../../components/NestedListItem/NestedListItem';

class NestedListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getNestedList()
  }

  render() {
    const {nestedList} = this.props;
    return (
      <ul className="list-group" style={{textAlign: 'center'}}>
        {nestedList.map(item =>
          <NestedListItem
            key={item.get('id')}
            item={item}
          />
        )}
      </ul>
    );
  }
}

function mapStateToProps ({nestedList}) {
  return {
    nestedList: getNestedUsersList(nestedList)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NestedListContainer);
