import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import firebase_config from './firebase_config';

firebase.initializeApp(firebase_config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
