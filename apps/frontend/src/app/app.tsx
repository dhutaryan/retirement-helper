import { useEffect } from 'react';

import { useTypedSelector } from './hooks';
import { useActions } from './hooks/use-actions';
import { AppRouter } from './router/app-router';
import { AppActionCreators } from './store/reducers/app/action-creators';

export function App() {
  const { isAuth } = useTypedSelector((state) => state.app);
  const { checkSession } = useActions(AppActionCreators);

  useEffect(() => {
    checkSession();
  }, [isAuth]);

  return <AppRouter />;
}

export default App;
