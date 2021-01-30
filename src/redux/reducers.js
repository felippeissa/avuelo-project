// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
});
