import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';

import { AuthActionCreators } from '@frontend/store/reducers/auth/action-creators';
import { RouteName } from '../../router/routes';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';

export const Header: FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { logout } = useActions(AuthActionCreators);
  const { user } = useTypedSelector((state) => state.app);
  const firstLetter = user?.name.slice(0, 1).toUpperCase();
  const userMenu = (
    <Menu>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header>
      <Row justify="space-between" wrap={false}>
        <Col>
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            disabledOverflow={true}
            selectedKeys={[path]}
          >
            <Menu.Item key={RouteName.ACTIVITY}>
              <Link to={RouteName.ACTIVITY}>Activity</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          <Dropdown
            placement="bottomRight"
            overlay={userMenu}
            trigger={['click']}
          >
            <Avatar style={{ cursor: 'pointer' }}>{firstLetter}</Avatar>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};
