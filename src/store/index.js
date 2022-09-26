import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { tableReducer } from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension's options like name, actionsBlacklist, actionsCreators, serialize...
    })
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(tableReducer, enhancer);

export default store;
