import React from "react"

var Image = React.createClass({
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
			<div className="image">
				{(() => {if(this.state.loaded){
					return <img src={this.props.imgsrc} />
				} else {
					return <div style={{color: "white"}}>Loading...</div>
				}})()}
			</div>
		);
	}
});

module.exports = Image;