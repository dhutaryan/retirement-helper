import { Rule } from 'rc-field-form/lib/interface';
import { useTranslation } from 'react-i18next';

export const useFormRules = () => {
  const { t } = useTranslation();
  const rules = {
    required: (message = t('FORM_ERROR.FIELD_IS_REQUIRED')): Rule => ({
      required: true,
      message,
    }),
    email: (message = t('FORM_ERROR.EMAIL_INVALID')): Rule => ({
      type: 'email',
      message,
    }),
    equal:
      (compareWith: string, message: string): Rule =>
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue(compareWith) === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(t(message)));
        },
      }),
  };

  return rules;
};
