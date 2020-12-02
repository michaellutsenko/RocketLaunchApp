import React from 'react';
import { Provider } from 'react-redux';
import MainView from './views/MainView';
import { configureStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './components/Spinner';

// Creating redux store
const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      {/* PersistGate keeps the app from rendering until the state is restored
      and show the spinner while the app is loading */}
      {/* REWRITE: */}
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <MainView />
      </PersistGate>
    </Provider>
  );
};

export default App;
