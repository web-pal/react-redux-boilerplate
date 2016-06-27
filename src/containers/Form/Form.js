import React, { Component } from 'react';


const propTypes = {
};


class FormContainer extends Component {
  render() {
    return (
      <div>
        <div className="col-md-3" />
        <div className="col-md-6 col-offset-3">
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}


FormContainer.propTypes = propTypes;

export default FormContainer;
