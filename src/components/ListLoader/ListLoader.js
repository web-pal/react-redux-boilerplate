import React from 'react';


const propTypes = {
};


const ListLoader = (props) => (
  <div {...props} className="timeline-wrapper list-group-item">
    <div className="timeline-item">
      <div className="animated-background">
        <div className="background-masker header-top" />
        <div className="background-masker header-left" />
        <div className="background-masker header-right" />
        <div className="background-masker header-bottom" />
        <div className="background-masker subheader-left" />
        <div className="background-masker subheader-right" />
      </div>
    </div>
  </div>
);

ListLoader.propTypes = propTypes;

export default ListLoader;
