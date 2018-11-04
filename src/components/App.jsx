import React from 'react';
import FilmStrip from './FilmStrip.jsx';
import { APODContext } from '../modules/contexts.js';

export default class App extends React.Component {
  render() {
    return (
      <APODContext.Provider value='bar' >
        <FilmStrip />
      </APODContext.Provider>
    );
  }
}
