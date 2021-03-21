import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeInformacao extends React.Component {
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
					height="100%"
					width="100%"
					viewBox="0 0 24 24"
					color="#999999"
				>
					<Path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLineJoin="round"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></Path>
				</Svg>
			</View>
		);
	}
}
