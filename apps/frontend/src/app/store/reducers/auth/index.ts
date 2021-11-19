import { AuthAction, AuthActionType } from './actions';

export interface AuthState {
  isPending: boolean;
}

const initialState: AuthState = {
  isPending: false,
};

export function authReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionType.SET_IS_PENDING:
      return { ...state, isPending: action.payload };
    default:
      return state;
  }
}
