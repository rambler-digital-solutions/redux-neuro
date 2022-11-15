import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../_redux';
import { ErrorBoundary } from '../_components';

import { LettersList } from 'src/letters/components/LettersList';
import { Notification } from 'src/notification/components/Notification';
import { Window } from 'src/popup/components/Window';
import { Recorder } from 'src/_recorder/components/Recoreder';

const Application = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <LettersList />
      <Notification />
      <Window />
      {/* <Recorder /> */}
    </Provider>
  </ErrorBoundary>
);

ReactDOM.render(<Application />, document.getElementById('app'));
