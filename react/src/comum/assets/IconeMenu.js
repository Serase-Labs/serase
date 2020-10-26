import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeMenu extends React.Component {
	render() {
		return (
			<View
				style={[
					StyleSheet.absoluteFill,
					{ alignItems: "center", justifyContent: "center" },
				]}
			>
				<Svg
					strokeWidth="2"
					height={"100%"}
					width="100%"
					viewBox="0 0 24 24"
					color="#2C5282"
				>
					<Path
						stroke="currentColor"
						strokeLinejoin="round"
						strokeLinecap="round"
						d="M4 6h16M4 12h16M4 18h16"
					></Path>
				</Svg>
			</View>
		);
	}
}
