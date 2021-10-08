export enum AuthActionType {
  SET_IS_PENDING = 'SET_IS_PENDING',
}

export interface SetIsPendingAction {
  type: AuthActionType.SET_IS_PENDING;
  payload: boolean;
}

export type AuthAction = SetIsPendingAction;
