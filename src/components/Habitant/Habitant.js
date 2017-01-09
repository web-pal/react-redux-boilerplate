import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import { getHabitants} from '../../utils/selectors';

const propTypes = {};

class Habitant extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {item, habitants } = this.props;
    return (

      <li className='list-group-item'>{habitants
        .map(item => <span key={item.get('id')}>{item.get('firstName')}</span>)}</li>

  )
  }
}

function mapStateToProps({citiesList}, props) {
  return {
    habitants: getHabitants(citiesList, props)
  };
}

export default connect(mapStateToProps)(Habitant);


