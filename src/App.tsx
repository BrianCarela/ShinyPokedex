import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PokemonAxios from './PokemonAxios';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <PokemonAxios />
      </div>
    </Provider>
  );
};

export default App;