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
connect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#efcc19"});

subscribeRecord(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);

