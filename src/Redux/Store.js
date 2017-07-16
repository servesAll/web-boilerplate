import "regenerator-runtime/runtime";
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { autoRehydrate, persistStore } from 'redux-persist';

import Redux from '/src/Redux';
import RootSaga from '/src/Redux/Sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
    Redux,
    {},
    composeEnhancers(
        applyMiddleware(...middleware),
        autoRehydrate()
    )
);

sagaMiddleware.run(RootSaga);

persistStore(store);

export default store;
