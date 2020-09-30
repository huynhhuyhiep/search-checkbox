import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '../store';
import Search from '../components/Search';
import Checkbox from '../components/Checkbox';

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex-row">
        <div className="app-content">
          <Search />
        </div>
        <div className="divider-horizontal" />
        <div className="app-content">
          <Checkbox />
        </div>
      </div>
    </Provider>
  );
};

export default App;
