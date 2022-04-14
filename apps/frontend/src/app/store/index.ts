import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducers } from './reducers';

export const PERSIST_STORE_KEY = 'retirement-heper';

const persistConfig = {
  key: PERSIST_STORE_KEY,
  storage,
  whitelist: ['app'],
};

const rootReducer = combineReducers<typeof reducers>(reducers);

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(thunk),
);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
