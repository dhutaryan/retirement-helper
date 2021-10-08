import { Rule } from 'rc-field-form/lib/interface';

export const rules = {
  required: (message = 'Field is required'): Rule => ({
    required: true,
    message,
  }),
  email: (message = 'Email is invalid'): Rule => ({ type: 'email', message }),
  equal:
    (compareWith: string, message: string): Rule =>
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue(compareWith) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message));
      },
    }),
};
