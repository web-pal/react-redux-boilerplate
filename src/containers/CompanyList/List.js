import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import * as ListActions from '../../actions/companyList';
import { getCompaniesList } from '../../utils/selectors';
import CompanyListItem from '../../components/CompanyListItem/CompanyListItem';

const propTypes = {
  list: ImmutablePropTypes.list.isRequired,
  listIsLoading: PropTypes.bool.isRequired,
  getCompanyList: PropTypes.func.isRequired
};

class ListContainer extends Component {
  componentWillMount() {
    this.props.getCompanyList();
  }

  render() {
    const { listIsLoading, list } = this.props;
    return (
      <ul className="list-group" style={{ textAlign: 'center' }}>
        {listIsLoading ?
          <h1>List is loading...</h1> :
          <div>
            {list.map(item =>
              <CompanyListItem
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

function mapStateToProps({ companyList, ui }) {
  return {
    listIsLoading: ui.get('companyListIsLoading'),
    list: getCompaniesList(companyList)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
