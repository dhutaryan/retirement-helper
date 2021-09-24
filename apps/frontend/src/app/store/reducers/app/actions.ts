export enum AppActionType {
  SET_AUTH = 'SET_AUTH',
}

export interface SetAuthAction {
  type: AppActionType.SET_AUTH;
  payload: boolean;
}

export type AppAction = SetAuthAction;
