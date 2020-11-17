import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default function IconeInicio({ estado }) {
	let icone;

	if (estado === true) {
		icone = (
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
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Path
						d="M1 8l7-7 7 7"
						stroke="#2A4365"
						strokeWidth={1.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</Svg>
			</View>
		);
	} else if (estado === false) {
		icone = (
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
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Path
						d="M15 1L8 8 1 1"
						stroke="#333"
						strokeWidth={1.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					></Path>
				</Svg>
			</View>
		);
	}

	return icone;
}
