import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeDespesa extends React.Component {
	constructor(props) {
		super(props);
		this.color = props.uso == "sistema" ? "#2A4365" : "#E53E3E";
	}

	render() {
		return (
			<View
				style={[
					StyleSheet.absoluteFill,
					{ alignItems: "center", justifyContent: "center" },
				]}
			>
				<Svg
					strokeWidth="1.5"
					height={"100%"}
					width="100%"
					viewBox="0 0 24 24"
					color={this.color}
				>
					<Path
						stroke="currentColor"
						strokeLinejoin="round"
						strokeLinecap="round"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
					/>
				</Svg>
			</View>
		);
	}
}
