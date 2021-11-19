import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import styled from 'styled-components';

import { rules } from '@frontend/utils';
import { AuthActionCreators } from '@frontend/store/reducers/auth/action-creators';
import { useTypedSelector } from '@frontend/hooks';

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
  const dispatch = useDispatch();
  const { isPending } = useTypedSelector((state) => state.authReducer);

  const onSubmit = (form: SignUpForm) => {
    dispatch(AuthActionCreators.signUp(form.name, form.email, form.password));
  };

  return (
    <SignUpCard title="Sign up">
      <Form layout="vertical" requiredMark="optional" onFinish={onSubmit}>
        <Form.Item label="Name" name="name" rules={[rules.required()]}>
          <Input />
        </Form.Item>
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
        <Form.Item
          label="Confirm password"
          name="confirm-password"
          dependencies={['password']}
          rules={[
            rules.required(),
            rules.equal('password', 'Passwords do not match'),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button htmlType="submit" type="primary" loading={isPending}>
            Sign up
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text>
        Already have an account?
        <Link to="login">
          <Typography.Link style={{ marginLeft: '8px' }}>
            Sign in
          </Typography.Link>
        </Link>
      </Typography.Text>
    </SignUpCard>
  );
};
