import React, {PropTypes} from 'react';
import {connect} from 'redux';

const propTypes = {};

const NestedListItem = (props) => {
    const { item } = props;
    return (
      <li className='list-group-item'>{item.get('city')}</li>
    )
};

export default NestedListItem;


