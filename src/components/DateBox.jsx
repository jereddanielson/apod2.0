/*
	Copyright 2016, Jered Danielson
	jered@uw.edu

	This file is part of APOD 2.0.

	APOD 2.0 is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	APOD 2.0 is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with APOD 2.0.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from "react";
import DayPicker from "./DayPicker.jsx";
import MonthPicker from "./MonthPicker.jsx";
import YearPicker from "./YearPicker.jsx";

const DateBox = (props) => {
  const style = {
    display: "block",
    position: "absolute",
    left: "10px",
    top: 0,
    fontFamily: "'Roboto Slab', monospace",
    zIndex: 100,
    display: "flex",
  };

  return (
    <div id="datebox" style={style}>
      <DayPicker
        curDay={props.curDate ? props.curDate.date() : ""}
        daysInCurMonth={
          props.curDate ? props.curDate.clone().endOf("month").date() : ""
        }
        curDateMoment={props.curDate}
        setNewDate={props.setNewDate}
      />
      <div
        style={{
          display: "inline-block",
          marginLeft: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <MonthPicker
          curMonth={
            props.curDate ? props.curDate.clone().format("MMMM").toString() : ""
          }
          curDateMoment={props.curDate}
          setNewDate={props.setNewDate}
        />
        <YearPicker
          curYear={props.curDate ? props.curDate.year() : ""}
          curDateMoment={props.curDate}
          setNewDate={props.setNewDate}
        />
      </div>
    </div>
  );
};

module.exports = DateBox;
