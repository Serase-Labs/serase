import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class SvgExample extends React.Component {
	constructor(props) {
		super(props);
		// A elaborar
		this.color = props.uso == "sistema" ? "#2A4365" : "#2AF598";
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
					viewBox="0 0 100 100"
					color="red"
				>
					<Path
						stroke="currentColor"
						strokeLinejoin="round"
						strokeLinecap="round"
						d="M12 4v16m8-8H4"
					></Path>
				</Svg>
			</View>
		);
	}
}
