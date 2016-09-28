import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired
} from 'revalidate';

const isValidEmail = createValidator(
  message => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
    return null;
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


/* eslint-disable react/prop-types */
const renderField = ({ input, label, placeholder, type, name, meta: { touched, error } }) => (
  <div className={`form-group ${(!touched || error === undefined) ? '' : 'has-error'}`}>
    <label htmlFor={`${name}-id`}>{label}</label>
    {touched && error &&
      <label htmlFor={`${name}-id`} className="error">{error}</label>
    }
    <input
      id={`${name}-id`}
      className="form-control"
      placeholder={placeholder}
      type={type}
      {...input}
    />
  </div>
);
/* eslint-enable react/prop-types */

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired
};


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class FormContainer extends Component {
  /* eslint-disable no-unused-vars */
  static handleSubmit(value, dispatch) {
  /* eslint-enable no-unused-vars */
    return sleep(1000) // simulate server latency
      .then(() => {
        throw new SubmissionError({ email: 'User already exist', _error: 'Form failed!' });
      });
      /* In production here we will use fetch.js
      return fetch('/url',
        { method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
          body: JSON.stringify(value)
        })
        .then(response =>
          (response.json())
        )
        .then(json => {
          if (json.status === 'success') {
            console.log('Success!');
            dispatch({ action: 'Action',});
          }
          throw new SubmissionError({
            email: json.message, _error: 'Auth failed!' }
          );
        });
      */
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;

    return (
      <div>
        <div className="col-md-3" />
        <div className="col-md-6 col-offset-3">
          <form onSubmit={handleSubmit(FormContainer.handleSubmit)}>
            <Field
              name="email"
              type="email"
              label="Email address"
              component={renderField}
              placeholder="Email"
            />
            <Field
              name="password"
              type="password"
              label="Password"
              component={renderField}
              placeholder="Password"
            />
            <button type="submit" disabled={submitting} className="btn btn-default">
              {submitting ? <i /> : <i />} Submit
            </button>
            <button
              type="button"
              className="btn btin-default"
              style={{ marginLeft: '10px' }}
              disabled={pristine || submitting}
              onClick={reset}
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
  validate
})(FormContainer);
