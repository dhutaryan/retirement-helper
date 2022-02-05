import { User } from '@shared/models';

export enum AppActionType {
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  LOGOUT = 'LOGOUT',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

export interface SetAcessTokenAction {
  type: AppActionType.SET_ACCESS_TOKEN;
  payload: string;
}

export interface LogoutAction {
  type: AppActionType.LOGOUT;
}

export interface SetCurrentUserAction {
  type: AppActionType.SET_CURRENT_USER;
  payload: User;
}

export type AppAction =
  | SetAcessTokenAction
  | LogoutAction
  | SetCurrentUserAction;
