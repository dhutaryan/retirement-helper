import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useTypedSelector } from './hooks';
import { useActions } from './hooks/use-actions';
import { AppRouter } from './router/app-router';
import { AppActionCreators } from './store/reducers/app/action-creators';

const loadingIcon = <LoadingOutlined spin />;

export function App() {
  const { isAuth } = useTypedSelector((state) => state.app);
  const { checkSession } = useActions(AppActionCreators);
  const { ready } = useTranslation();

  useEffect(() => {
    checkSession();
  }, [isAuth]);

  return ready ? (
    <AppRouter />
  ) : (
    <Row className="h-100" align="middle" justify="center">
      <Spin size="large" indicator={loadingIcon} />
    </Row>
  );
}

export default App;
