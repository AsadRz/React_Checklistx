import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import NoSsr from '@material-ui/core/NoSsr';
import Amplify from '@aws-amplify/core';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/storeCreator';
import awsConfig from './config/aws-config.json';

import MainApp from './MainApp';
import './styles/App.css';

Amplify.configure({
  Auth: {
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
    mandatorySignId: true,
  },
});

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NoSsr>
            <MainApp />
          </NoSsr>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
