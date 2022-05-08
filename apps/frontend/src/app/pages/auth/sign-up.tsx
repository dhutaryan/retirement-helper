import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Form, Input, Typography } from 'antd';
import styled from 'styled-components';

import { rules } from '@frontend/utils';
import { AuthActionCreators } from '@frontend/store/reducers/auth/action-creators';
import { useFormRules, useTypedSelector } from '@frontend/hooks';
import { useActions } from '../../hooks/use-actions';

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

export const SignUp: FC = () => {
  const { t } = useTranslation();
  const { isPending } = useTypedSelector((state) => state.auth);
  const { signUp } = useActions(AuthActionCreators);
  const { required, email, equal } = useFormRules();

  const onSubmit = (form: SignUpForm) => {
    signUp(form.name, form.email, form.password);
  };

  return (
    <SignUpCard title={t('HEADER.REGISTRATION')}>
      <Form layout="vertical" requiredMark="optional" onFinish={onSubmit}>
        <Form.Item
          name="name"
          label={t('FORM_LABEL.NAME')}
          rules={[required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={t('FORM_LABEL.EMAIL')}
          rules={[required(), email()]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('FORM_LABEL.PASSWORD')}
          rules={[required()]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          label={t('FORM_LABEL.CONFIRM_PASSWORD')}
          dependencies={['password']}
          rules={[
            required(),
            equal('password', 'FORM_ERROR.PASSWORD_DO_NOT_MATCH'),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button htmlType="submit" type="primary" loading={isPending}>
            {t('BUTTON.SIGN_UP')}
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text>
        {t('ALREADY_HAVE_AN_ACCOUNT')}
        <Link to="login">
          <Typography.Link style={{ marginLeft: '8px' }}>
            {t('BUTTON.SIGN_IN')}
          </Typography.Link>
        </Link>
      </Typography.Text>
    </SignUpCard>
  );
};
