import React from 'react';
import { render } from 'react-dom';
import AdminDashboard from './app/loginComponents/content';
import { Provider } from 'react-redux';
import store from './store/store'


const app = (
    <Provider store={store}>
        <AdminDashboard />
    </Provider>
);
render(app, document.getElementById('root'));