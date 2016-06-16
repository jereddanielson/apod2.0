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

import React from "react"

var ArrowNav = React.createClass({
	render() {
		return (
			<div className={"arrow-nav " + this.props.direction} onClick={this.props.setNewDate}>
				<div className="arrow-nav-inner">
					<svg width="40" height="100" viewBox="0 0 40 100">
						<path stroke="white" strokeWidth="8" fill="none" d="M 35,5 L 5,50 L 35,95" />
					</svg>
				</div>
			</div>
		);
	}
});

module.exports = ArrowNav;