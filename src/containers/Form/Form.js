import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired
} from 'revalidate';

const fields = ['email', 'password'];


const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  'Invalid email address'
);

const validate = combineValidators({
  email: composeValidators(
    isRequired({ message: 'Required' }),
    isValidEmail
  )(),
  password: isRequired({ message: 'Required' })
});

const propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};


class FormContainer extends Component {
  handleSubmit(value, dispatch) {
    // In production here we will use fetch.js
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ email: 'User already exist', _error: 'Registration failed!' });
        // Without error we can run our internal action or dispatch results
        // using dispatch object
      }, 1000); // simulate server latency
    });
  }

  render() {
    const { fields: { email, password }, resetForm, handleSubmit, submitting } = this.props;
    return (
      <div>
        <div className="col-md-3" />
        <div className="col-md-6 col-offset-3">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Email" {...email} />
              {email.touched && email.error &&
                <span className="help-block">
                  <p className="text-danger">{email.error}</p>
                </span>
              }
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password" className="form-control" placeholder="Password" {...password}
              />
              {password.touched && password.error &&
                <span className="help-block">
                  <p className="text-danger">{password.error}</p>
                </span>
              }
            </div>
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i /> : <i />} Submit
            </button>
            <button
              type="button"
              className="btn btin-default"
              style={{ marginLeft: '10px' }}
              disabled={submitting} onClick={resetForm}
            >
              Clear Values
            </button>
          </form>
        </div>
      </div>
    );
  }
}


FormContainer.propTypes = propTypes;

export default reduxForm({
  form: 'FormContainer',
  fields,
  validate
})(FormContainer);
