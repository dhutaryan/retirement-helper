import { FC } from 'react';
import { Layout } from 'antd';

import { Header } from './header';

export const AppLayout: FC = ({ children }) => {
  return (
    <Layout className="h-100">
      <Header />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};
