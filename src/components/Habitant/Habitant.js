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

      <ul className='list-group-item'>{habitants
        .map(item => <li className="list-group-item" key={item.get('id')}>Habitant: {item.get('firstName')}</li>)}</ul>

  )
  }
}

function mapStateToProps({citiesList}, props) {
  return {
    habitants: getHabitants(citiesList, props)
  };
}

export default connect(mapStateToProps)(Habitant);


