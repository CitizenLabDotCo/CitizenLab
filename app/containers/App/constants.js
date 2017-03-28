/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const API_PATH = 'http://localhost:4000/api/v1';

export const LOADED_CURRENT_TENANT = 'app/App/LOADED_CURRENT_TENANT';
export const LOAD_CURRENT_USER = 'app/App/LOAD_CURRENT_USER';
