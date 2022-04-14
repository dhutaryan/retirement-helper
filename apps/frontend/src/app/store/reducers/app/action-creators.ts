import { User } from '@shared/models';
import { AppDispatch, store } from '../..';
import { UsersService } from '../../../services';
import {
  AppActionType,
  LogoutAction,
  SetAcessTokenAction,
  SetCurrentUserAction,
} from './actions';

export const AppActionCreators = {
  setAccessToken: (payload: string): SetAcessTokenAction => ({
    type: AppActionType.SET_ACCESS_TOKEN,
    payload,
  }),
  logout: (): LogoutAction => ({
    type: AppActionType.LOGOUT,
  }),
  checkSession: () => (dispatch: AppDispatch) => {
    const { isAuth } = store.getState().app;

    if (isAuth) {
      UsersService.me().then(({ data }) =>
        dispatch(AppActionCreators.setUser(data)),
      );
    }
  },
  setUser: (payload: User): SetCurrentUserAction => ({
    type: AppActionType.SET_CURRENT_USER,
    payload,
  }),
};
