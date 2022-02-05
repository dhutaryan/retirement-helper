import { AxiosError } from 'axios';
import { message } from 'antd';

import { ErrorCode, ErrorResponse } from '@shared/models';
import { AppDispatch } from '../..';
import { AuthService } from '../../../services';
import { AuthActionType, SetIsPendingAction } from './actions';
import { history, RouteName } from '../../../router/routes';
import { AppActionCreators } from '../app/action-creators';

export const AuthActionCreators = {
  setIsPending: (payload: boolean): SetIsPendingAction => ({
    type: AuthActionType.SET_IS_PENDING,
    payload,
  }),
  signUp:
    (name: string, email: string, password: string) =>
    (dispatch: AppDispatch) => {
      dispatch(AuthActionCreators.setIsPending(true));
      return AuthService.signUp(name, email, password)
        .then(() => {
          message.success('You have signed up successfully');
          dispatch(AuthActionCreators.setIsPending(false));
          history.push(RouteName.LOGIN);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          const errorCode = error.response?.data.errorCode;

          switch (errorCode) {
            case ErrorCode.ENTITY_ALREADY_EXIST:
              message.error('User with such email already exists');
              break;
          }

          dispatch(AuthActionCreators.setIsPending(false));
        });
    },
  login: (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setIsPending(true));

    return AuthService.login(email, password)
      .then(({ data }) => {
        dispatch(AuthActionCreators.setIsPending(false));
        dispatch(AppActionCreators.setAccessToken(data.accessToken));
        history.push(RouteName.ACTIVITY);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorCode = error.response?.data.errorCode;

        switch (errorCode) {
          case ErrorCode.INVALID_CREDENTIALS:
            message.error('Invalid credentials');
            break;
        }

        dispatch(AuthActionCreators.setIsPending(false));
      });
  },
  logout: () => (dispatch: AppDispatch) => {
    return AuthService.logout().then(() => {
      dispatch(AppActionCreators.logout());
    });
  },
};
