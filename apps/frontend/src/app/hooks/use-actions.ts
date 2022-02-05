import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

export const useActions = <T extends ActionCreatorsMapObject<any>>(
  actions: T,
) => {
  const dispatch = useDispatch();
  return bindActionCreators<unknown, T>(actions, dispatch);
};
