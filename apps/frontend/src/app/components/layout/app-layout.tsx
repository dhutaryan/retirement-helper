import { FC } from 'react';
import { Layout } from 'antd';

import { Header } from './header';
import styled from 'styled-components';

const LayoutContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`;

export const AppLayout: FC = ({ children }) => {
  return (
    <Layout className="h-100">
      <Header />
      <LayoutContent style={{ padding: '1rem 3rem' }}>{children}</LayoutContent>
    </Layout>
  );
};
