import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

console.log(reducers)

const middlewares = [
  thunk
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const store = createStore(
  combineReducers(reducers),
  undefined,
  compose(
    autoRehydrate(),
    applyMiddleware(...middlewares)
  )
);

persistStore(store);

export default store;
