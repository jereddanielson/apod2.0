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
import FocusTrap from "focus-trap-react";

const ContentBox = (props) => {
  const style = {
    margin: "0 auto",
    right: "20px",
    top: "calc(50% - 30px)",
    transform: "translate(-50%, -50%) scale(1)",
    background: "rgba(255, 100, 100, .1)",
    position: "absolute",
  };
  return (
    <FocusTrap>
      <a
        className="contentbox"
        style={style}
        href="#"
        title="Close hi resolution image"
        onClick={(e) => {
          e.preventDefault();
          props.toggleHiRes(e);
        }}
      >
        {props.children}
      </a>
    </FocusTrap>
  );
};

module.exports = ContentBox;
