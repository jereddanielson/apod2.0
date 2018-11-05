import React from "react";
import { Switch, Route } from "react-router-dom";
import DatePicker from "./DatePicker.jsx";
import Title from "./Title.jsx";
import Info from "./Info.jsx";
import CurrentImage from "./CurrentImage.jsx";
import FilmStrip from "./FilmStrip.jsx";
import { APODContext } from "../modules/contexts.js";

export default class App extends React.Component {
  state = {
    ctx: {
      store: {
        map: new Map()
      }
    }
  };
  render = () => {
    return (
      <APODContext.Provider value={this.state.ctx.store}>
        <div>
          <DatePicker />
          <Title />
          <Info />
          <Switch>
            <Route path="/:date" component={CurrentImage} />
          </Switch>
          <FilmStrip />
        </div>
      </APODContext.Provider>
    );
  };
}
