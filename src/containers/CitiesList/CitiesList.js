import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ListActions from '../../actions/citiesList';
import {getCities, getHabitants} from '../../utils/selectors';
import Habitant from '../../components/Habitant/Habitant';

class CitiesListContiner extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCitiesList()
  }

  render() {
    const {citiesList, isLoading} = this.props;
    console.log('cities ',citiesList);
    return (
      <ul className="list-group" style={{textAlign: 'center'}}>
        {isLoading
          ? <div>Loading.....</div>
          : (citiesList.map(item =>
          <Habitant
            key={item.get('id')}
            item={item}
          />
        ))}
        <ul className="list-group" >{
          citiesList.map(item => <li className="list-group-item" key={item.get('id')}>City: {item.get('city')}</li>)
      }</ul>
      </ul>
    );
  }
}

function mapStateToProps ({citiesList, ui}) {
  return {
    isLoading: ui.get('isLoading'),
    citiesList: getCities(citiesList)
    // habitantsList: getHabitants(citiesList)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesListContiner);
