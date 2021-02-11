import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeDespesa extends React.Component {
	constructor(props) {
		super(props);
		this.color = props.uso == "sistema" ? "#2A4365" : "#F56565";
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
					strokeWidth="0.5"
					height={"100%"}
					width="100%"
					viewBox="0 0 24 24"
					color={this.color}
				>
					<Path
						stroke="currentColor"
						strokeLinejoin="round"
						strokeLinecap="round"
						fill={this.color}
						d="M8.707 19.707a1 1 0 01-1.414 0l-7-7a1 1 0 111.414-1.414L7 16.586V0s.76.175 1.207.372c.248.11.518.327.611.481.078.129.127.265.154.413.018.075.028.153.028.234v15.086l5.293-5.293a1 1 0 011.414 1.414l-7 7z"
					/>
				</Svg>
			</View>
		);
	}
}
