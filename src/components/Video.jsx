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

class Video extends React.Component {
  iframeStyle = {
    width: "960px",
    height: "540px",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 100px #404448",
  };
  render = () => {
    var vidsrc = this.props.vidsrc?.replace("http://", "https://");
    return (
      <iframe
        style={this.iframeStyle}
        src={vidsrc}
        frameBorder={0}
        allowFullScreen
        alt={this.props.alt}
        title={this.props.title}
      />
    );
  };
}

module.exports = Video;
