import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListActions from '../../actions/citiesList';
import { getCities } from '../../utils/selectors';
import Habitant from '../../components/Habitant/Habitant';

const propTypes = {
  getCitiesList: PropTypes.func.isRequired,
  citiesList: ImmutablePropTypes.list.isRequired,
  isLoading: PropTypes.object.isRequired
};

class CitiesListContiner extends Component {
  componentWillMount() {
    this.props.getCitiesList();
  }

  render() {
    const { citiesList, isLoading } = this.props;
    console.log('cities ', this.props);
    return (
      <div style={{ textAlign: 'center' }}>
        {isLoading.get('isLoading')
        ? <div>Loading.....</div>
        : (citiesList.map(item =>
          <ul className="list-group" key={item.get('id')}>
            <h3>City: {item.get('city')}</h3>
            <Habitant
              key={item.get('id')}
              item={item}
            />
          </ul>))}
      </div>
    );
  }
}

CitiesListContiner.propTypes = propTypes;

function mapStateToProps({ citiesList, ui }) {
  return {
    isLoading: ui,
    citiesList: getCities(citiesList)
    // habitantsList: getHabitants(citiesList)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesListContiner);
