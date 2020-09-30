import { applyMiddleware, createStore } from 'redux';
import reducer from './components/Search/reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
