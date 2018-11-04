import React from 'react';
import { APODContext } from '../modules/contexts.js';

export default class FilmStrip extends React.Component {
  render() {
    return (
      <APODContext.Consumer>
        {ctx => <div>ok {ctx}</div>}
      </APODContext.Consumer>
    );
  }
}
