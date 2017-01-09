import React, {PropTypes} from 'react';
import {connect} from 'redux';

const propTypes = {};

const NestedListItem = (data) => {
  const items = data.data.map(item => {
    return (
      <li key={item.get('id')}>{item.get('firstName')}</li>
    )
  });
  return (
    <div>
      <span>{items}</span>
    </div>
  );
};

export default NestedListItem;

