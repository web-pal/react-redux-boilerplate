import React, { Component, PropTypes } from 'react';


const propTypes = {
  children: PropTypes.element.isRequired
};


class BaseContainer extends Component {
  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}


BaseContainer.propTypes = propTypes;

export default BaseContainer;
