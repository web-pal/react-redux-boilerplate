import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as ListActions from '../../actions/companyList';
import { getCompaniesList } from '../../utils/selectors';
import ListItem from '../../components/CompanyItem/CompanyItem';


const propTypes = {
  getList: PropTypes.func.isRequired,
  list: ImmutablePropTypes.list.isRequired,
  listIsLoading: PropTypes.bool.isRequired,
};


class ListContainer extends Component {

  componentWillMount() {
    this.props.getList();
  }


  render() {
    const { listIsLoading, list } = this.props;
    return (
      <ul className="list-group" style={{ textAlign: 'center' }}>
        {listIsLoading ?
          <h1>List is loading...</h1> :
          <div>
            {list.map(item =>
              <ListItem
                key={item.get('id')}
                item={item}
              />
            )}
          </div>
        }
      </ul>
    );
  }
}


ListContainer.propTypes = propTypes;

function mapStateToProps({ companies, ui }) {
  return {
    listIsLoading: ui.get('listIsLoading'),
    listAddIsLoading: ui.get('listAddIsLoading'),
    list: getCompaniesList(companies)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
