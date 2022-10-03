import thunk from "redux-thunk"
import reducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux"
 
const COMPOSE_ENHANCER = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const STORE = createStore(reducer, COMPOSE_ENHANCER(applyMiddleware(thunk)));

export default STORE