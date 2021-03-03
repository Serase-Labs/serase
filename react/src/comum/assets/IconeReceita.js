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
					strokeWidth="0.5"
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
						d="M8.707.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L7 3.414V20s.76-.175 1.207-.372c.248-.11.518-.327.611-.481.078-.129.127-.265.154-.413.018-.075.028-.153.028-.234V3.414l5.293 5.293a1 1 0 101.414-1.414l-7-7z"
					/>
				</Svg>
			</View>
		);
	}
}
