import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import connect from '@vkontakte/vk-connect';
import { Provider } from 'react-redux';
import store from './store';
import './unit/const';
import './control';
import { subscribeRecord } from './unit';

connect.send('VKWebAppInit', {});

subscribeRecord(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);

