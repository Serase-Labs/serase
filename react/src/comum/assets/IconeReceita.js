import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeReceita extends React.Component {
	constructor(props) {
		super(props);
		this.color = props.uso == "sistema" ? "#2A4365" : "#2AF598";
	}

	render() {
		return (
			<View style={[
				StyleSheet.absoluteFill,
				{ alignItems: "center", justifyContent: "center" },
			]}>
				<Svg
					strokeWidth="2"
					height="100%"
					width="100%"
					viewBox="0 0 24 24"
					color={this.color}
				>
					<Path
						stroke="currentColor"
						strokeLinejoin="round"
						strokeLinecap="round"
						fill={this.color}
						d="M5 10l7-7m0 0l7 7m-7-7v18" 
					/>
				</Svg>
			</View>
		);
	}
}