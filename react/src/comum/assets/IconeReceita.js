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
			<View style={[StyleSheet.absoluteFill]}>
				<Svg
					strokeWidth="1.5"
					height="100%"
					width="100%"
					viewBox="0 0 24 24"
					color={this.color}
				>
					<Path
						stroke="currentColor"
						strokeLinejoin="round"
						strokeLinecap="round"
						d="M8 17a5 5 0 01-.916-9.916 5.002 5.002 0 019.832 0A5.002 5.002 0 0116 17m-7-5l3-3m0 0l3 3m-3-3v12"
					></Path>
				</Svg>
			</View>
		);
	}
}
