import React, { Component, PropTypes } from 'react';
import ClickOutside from 'react-click-outside';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  editItemInList: PropTypes.func.isRequired,
  removeItemFromList: PropTypes.func.isRequired
};