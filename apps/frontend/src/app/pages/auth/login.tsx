import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Form, Input, Typography } from 'antd';
import styled from 'styled-components';

import { rules } from '@frontend/utils';
import { useTypedSelector } from '@frontend/hooks';
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
  const { isPending } = useTypedSelector((state) => state.auth);
  const { login } = useActions(AuthActionCreators);

  const onSubmit = (form: LoginForm) => {
    login(form.email, form.password);
  };

  return (
    <LoginCard title="Login">
      <Form layout="vertical" requiredMark="optional" onFinish={onSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[rules.required(), rules.email()]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[rules.required()]}>
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button htmlType="submit" type="primary" loading={isPending}>
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text>
        Don't have an account?
        <Link to="sign-up">
          <Typography.Link style={{ marginLeft: '8px' }}>
            Sign up
          </Typography.Link>
        </Link>
      </Typography.Text>
    </LoginCard>
  );
};
