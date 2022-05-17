import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Form, Input, Typography } from 'antd';
import styled from 'styled-components';

import { rules } from '@frontend/utils';
import { useFormRules, useTypedSelector } from '@frontend/hooks';
import { AuthActionCreators } from '@frontend/store/reducers/auth/action-creators';
import { useActions } from '../../hooks/use-actions';

interface LoginForm {
  email: string;
  password: string;
}

const LoginCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

export const Login: FC = () => {
  const { t } = useTranslation();
  const { isPending } = useTypedSelector((state) => state.auth);
  const { login } = useActions(AuthActionCreators);
  const { required, email } = useFormRules();

  const onSubmit = (form: LoginForm) => {
    login(form.email, form.password);
  };

  return (
    <LoginCard title={t('HEADER.LOGIN')}>
      <Form layout="vertical" requiredMark="optional" onFinish={onSubmit}>
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

        <Form.Item style={{ textAlign: 'right' }}>
          <Button htmlType="submit" type="primary" loading={isPending}>
            {t('BUTTON.SIGN_IN')}
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text>
        {t('DONT_HAVE_AN_ACCOUNT')}
        <Link to="sign-up">
          <Typography.Link style={{ marginLeft: '8px' }}>
            {t('BUTTON.SIGN_UP')}
          </Typography.Link>
        </Link>
      </Typography.Text>
    </LoginCard>
  );
};
