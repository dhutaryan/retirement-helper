import { FC } from 'react';
import { Col, Layout, Row } from 'antd';

export const AuthLayout: FC = ({ children }) => {
  return (
    <Layout className="h-100">
      <Row className="h-100" align="middle">
        <Col flex="auto">{children}</Col>
      </Row>
    </Layout>
  );
};
