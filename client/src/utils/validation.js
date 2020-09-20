/* eslint-disable no-template-curly-in-string */

import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Field is required',
  },
  string: {
    min: 'Min length is ${min}',
    max: 'Max length is ${max}',
    email: 'Invalid email address'
  },
  number: {
    min: 'Min value is ${min}',
    max: 'Max value is ${max}',
    integer: 'Must be a integer number',
    positive: 'Must be a positive number'
  }
});

export { Yup };
