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
      <ul className="list-group" style={{textAlign: 'center'}}>
        <ul className="list-group" >{
          citiesList.map(item => <li className="list-group-item" key={item.get('id')}>City: {item.get('city')}</li>)
        }</ul>
        {isLoading.get('isLoading')
          ? <div>Loading.....</div>
          : (citiesList.map(item =>
            <Habitant
              key={item.get('id')}
              item={item}
            />
        ))}
      </ul>
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
