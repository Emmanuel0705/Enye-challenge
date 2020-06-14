import { combineReducers } from 'redux';

import mapReducer from './map.reducer';
import userReducer from './user.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const reducer = combineReducers({
    map: mapReducer,
    user: userReducer,
});
export default persistReducer(persistConfig, reducer);
