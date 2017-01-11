import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListActions from '../../actions/citiesList';
import { getCities, getHabitants } from '../../utils/selectors';
import Habitant from '../../components/Habitant/Habitant';

const propTypes = {
  getCitiesList: PropTypes.func.isRequired,
  citiesList: ImmutablePropTypes.list.isRequired,
  habitantsList: ImmutablePropTypes.list.isRequired,
  meta: PropTypes.object.isRequired
};

class CitiesListContiner extends Component {
  componentWillMount() {
    this.props.getCitiesList();
  }

  render() {
    const { citiesList, habitantsList, meta } = this.props;
    const a = citiesList.map( item => item.get('habitants').toJS());
    return (
      <div style={{ textAlign: 'center' }}>
        {meta.get('fetching')
        ? <h2>Loading.....</h2>
        : (citiesList.map(city =>
          <ul className="list-group" key={city.get('id')}>
            <h3>City: {city.get('city')}</h3>
            <Habitant
              ids={a.toJS()}
              habitants={habitantsList}
            />
          </ul>))}
      </div>
    );
  }
}

CitiesListContiner.propTypes = propTypes;

function mapStateToProps({ citiesList, habitantsList }) {
  return {
    citiesList: getCities(citiesList),
    habitantsList: getHabitants(habitantsList),
    meta: citiesList.meta
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesListContiner);
