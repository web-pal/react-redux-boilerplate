import React, { PropTypes } from 'react';


const propTypes = {
  children: PropTypes.element.isRequired
};


const BaseContainer = ({ children }) => (
  <div className="row">
    {children}
  </div>
);


BaseContainer.propTypes = propTypes;

export default BaseContainer;
