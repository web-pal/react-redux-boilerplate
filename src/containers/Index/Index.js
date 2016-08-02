import React, { Component } from 'react';
import { Link } from 'react-router';

import { urls } from '../../routes';


const propTypes = {
};

// We can't use pure function here because in that case hot reloading won't work
// eslint-disable-next-line react/prefer-stateless-function
class IndexContainer extends Component {
  render() {
    return (
      <div className="list-group" style={{ textAlign: 'center' }}>
        <Link to={urls.list} className="list-group-item">
          <h4 className="list-group-item-heading">List</h4>
          <p className="list-group-item-text">Example with list objects</p>
        </Link>
        <Link to={urls.form} className="list-group-item">
          <h4 className="list-group-item-heading">Form</h4>
          <p className="list-group-item-text">Form example</p>
        </Link>
      </div>
    );
  }
}

IndexContainer.propTypes = propTypes;

export default IndexContainer;
