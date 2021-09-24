import { AppAction } from './actions';

export interface AppState {
  isAuth: boolean;
}

const initialState: AppState = {
  isAuth: false,
};

export function appReducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    default:
      return state;
  }
}
