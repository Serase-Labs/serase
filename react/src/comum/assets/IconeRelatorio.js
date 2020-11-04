import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeRelatorio extends React.Component {
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
					fill="none"
					height="100%"
					width="100%"
					viewBox="0 0 24 24"
					stroke="currentColor"
					color="#2A4365"
				>
					<Path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
					></Path>
					<Path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
					></Path>
				</Svg>
			</View>
		);
	}
}
