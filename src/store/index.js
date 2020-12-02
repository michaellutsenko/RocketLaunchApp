import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import * as api from '../api/api';

import {
  launchesReducer,
  favouritesReducer,
  requestInfoReducer,
  searchReducer,
} from './reducers';

const rootReducer = combineReducers({
  launches: launchesReducer,
  favourites: favouritesReducer,
  requestInfo: requestInfoReducer,
  search: searchReducer,
});

// I'm using react-persist to save the favourites list locally
// This way, the favourites will remain after relaunching the app
const pReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['favourites'],
  },
  rootReducer,
);

export const configureStore = () => {
  const store = createStore(
    pReducer,
    applyMiddleware(thunk.withExtraArgument(api)),
  );
  // Applying persist to the created store
  const persistor = persistStore(store);
  return { store, persistor };
};
