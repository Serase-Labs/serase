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
					strokeWidth="0.1"
					height="100%"
					width="100%"
					viewBox="0 0 20 20"
					color="#2C5282"
					fill="#2C5282"
				>
					<Path
						stroke="currentColor"
						strokeLinejoin="round"
						strokeLinecap="round"
						fillRule="evenodd"
						d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
						clipRule="evenodd"
					/>
				</Svg>
			</View>
		);
	}
}
