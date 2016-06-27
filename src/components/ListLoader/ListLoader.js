import React, { Component } from 'react';


const propTypes = {
};


class ListLoader extends Component {
  render() {
    return (
      <div {...this.props} className="timeline-wrapper list-group-item">
        <div className="timeline-item">
          <div className="animated-background">
            <div className="background-masker header-top"></div>
            <div className="background-masker header-left"></div>
            <div className="background-masker header-right"></div>
            <div className="background-masker header-bottom"></div>
            <div className="background-masker subheader-left"></div>
            <div className="background-masker subheader-right"></div>
          </div>
        </div>
      </div>
    );
  }
}


ListLoader.propTypes = propTypes;

export default ListLoader;
