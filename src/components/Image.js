import React from "react"

var Image = React.createClass({
	style: {
		boxShadow: "0 0 100px #404448"
	},
	imgstyle: {
		display: "block"
	},
	getInitialState() {
		return {loaded: false};
	},
	componentDidMount() {
		var imgElement = document.createElement("img");
		imgElement.onload = this.handleLoaded;
		imgElement.src = this.props.imgsrc;
	},
	handleLoaded() {
		this.setState({loaded: true});
	},
	render() {
		return (
			<div className="image" style={this.style}>
				{(() => {if(this.state.loaded){
					return <img style={this.imgstyle} src={this.props.imgsrc} />
				} else {
					return <div style={{color: "white"}}>Loading...</div>
				}})()}
			</div>
		);
	}
});

module.exports = Image;