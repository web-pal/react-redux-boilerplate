import React, {PropTypes} from 'react';
import {connect} from 'redux';

const propTypes = {};

const NestedListItem = (props) => {
    const { item } = props;
    return (
      <li className='list-group-item'>{item.get('firstName')}</li>
    )
};

export default NestedListItem;


