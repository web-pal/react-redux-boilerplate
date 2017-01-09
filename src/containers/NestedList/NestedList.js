import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ListActions from '../../actions/nestedList';
import {getNestedUsersList} from '../../utils/selectors';
import ListItemDeep from '../../components/NestedListItem/NestedListItem';

class NestedListContainer extends Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  componentWillMount() {
    this.props.getNestedList()
  }

  click () {
    console.log(this.props)

  }

  render() {
    const {nestedList} = this.props;

    return (
      <div>
        <ListItemDeep data={nestedList} />
      </div>
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
