import { AxiosError } from 'axios';
import { message } from 'antd';

import { ErrorCode, ErrorResponse } from '@shared/models';
import { AppDispatch } from '../..';
import { AuthService } from '../../../services';
import { AuthActionType, SetIsPendingAction } from './actions';
import { history, RouteName } from '../../../router/routes';

export const AuthActionCreators = {
  setIsLoading: (payload: boolean): SetIsPendingAction => ({
    type: AuthActionType.SET_IS_PENDING,
    payload,
  }),
  signUp:
    (name: string, email: string, password: string) =>
    async (dispatch: AppDispatch) => {
      dispatch(AuthActionCreators.setIsLoading(true));
      return AuthService.signUp(name, email, password)
        .then(() => {
          message.success('You have signed up successfully');
          dispatch(AuthActionCreators.setIsLoading(false));
          history.push(RouteName.LOGIN);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          const errorCode = error.response?.data.errorCode;

          switch (errorCode) {
            case ErrorCode.ENTITY_ALREADY_EXIST:
              message.error('User with such email already exists');
              break;
          }

          dispatch(AuthActionCreators.setIsLoading(false));
        });
    },
};
