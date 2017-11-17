import { createRoutine } from 'utils';
import { createActions } from 'redux-actions';

export const login = createRoutine('LOGIN');
export const register = createRoutine('REGISTER');
export const verify = createRoutine('VERIFY');

export const LOGOUT = 'LOGOUT';

export const { logout } = createActions(LOGOUT);
