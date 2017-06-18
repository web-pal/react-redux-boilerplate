import React from 'react';


/* http://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html */
const ListLoader = () => (
  <div className="timeline-wrapper list-group-item">
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

export default ListLoader;
