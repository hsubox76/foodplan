import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { config } from './private/firebase-config';
import App from './Components/App';
import 'font-awesome/css/font-awesome.css';
import './index.css';

firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
