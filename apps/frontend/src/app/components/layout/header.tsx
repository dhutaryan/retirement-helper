import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';

import { AuthActionCreators } from '@frontend/store/reducers/auth/action-creators';
import { getFirstLetter } from '@frontend/utils';
import { useTypedSelector } from '@frontend/hooks';
import { RouteName } from '../../router/routes';
import { useActions } from '../../hooks/use-actions';

export const Header: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname;
  const { logout } = useActions(AuthActionCreators);
  const { user } = useTypedSelector((state) => state.app);
  const firstLetter = getFirstLetter(user?.name as string);
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to={RouteName.PROFILE}>{t('MENU.PROFILE')}</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        {t('MENU.LOGOUT')}
      </Menu.Item>
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
              <Link to={RouteName.ACTIVITY}>{t('MENU.ACTIVITY')}</Link>
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
