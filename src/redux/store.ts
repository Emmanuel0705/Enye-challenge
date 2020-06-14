import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// sagaMiddleware.run()

export const persistor = persistStore(store);
