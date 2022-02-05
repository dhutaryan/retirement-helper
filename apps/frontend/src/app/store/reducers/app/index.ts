import { User } from '@shared/models';
import { AppAction, AppActionType } from './actions';

export interface AppState {
  isAuth: boolean;
  accessToken: string;
  user: User | null;
}

const initialState: AppState = {
  isAuth: false,
  accessToken: '',
  user: null,
};

export function appReducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionType.SET_ACCESS_TOKEN:
      return { ...state, isAuth: true, accessToken: action.payload };
    case AppActionType.LOGOUT:
      return { ...state, isAuth: false, accessToken: '' };
    case AppActionType.SET_CURRENT_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
