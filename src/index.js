import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { config } from '../private/firebase-config';
import App from './App';
import './index.css';

firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
