import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import firebase from 'firebase';
import './assets/styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import store from './store';
import App from './App';

axios.defaults.baseURL = 'https://swapi.co/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const config = {
  apiKey: "AIzaSyBGHobV9DYiyp-ergBgTdFInJELlJoJBQs",
  authDomain: "luminara-ad935.firebaseapp.com",
  databaseURL: "https://luminara-ad935.firebaseio.com",
  projectId: "luminara-ad935",
  storageBucket: "luminara-ad935.appspot.com",
  messagingSenderId: "863897962638"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Routes />
    </App>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
