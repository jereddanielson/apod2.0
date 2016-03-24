import React from "react"

var Image = React.createClass({
	style: {
		boxShadow: "0 0 100px #404448",
		cursor: "zoom-in",
		position: "absolute",
		transform: "translate(-50%, -50%)"
	},
	imgstyle: {
		display: "block",
		maxWidth: "100vw",
		maxHeight: "calc(100vh - 60px)"
	},
	getInitialState() {
		// start unloaded
		return {loaded: false};
	},
	componentDidMount() {
		// when mounted, create and load image
		var imgElement = document.createElement("img");
		imgElement.onload = this.handleLoaded;
		imgElement.src = this.props.imgsrc;
	},
	handleLoaded() {
		// once image successfully loads, switch loaded flag
		if(this.isMounted()){
			this.setState({loaded: true});
		}
	},
	render() {
		return (
			<div className="image" style={this.style}>
				{(() => {if(this.state.loaded){
					return <img style={this.imgstyle} onDragStart={function(e){e.preventDefault();}} src={this.props.imgsrc} />
				} else {
					return <div style={{color: "white"}}>Loading...</div>
				}})()}
			</div>
		);
	}
});

module.exports = Image;