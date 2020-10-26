import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default function IconeInicio({ estado }) {
	let icone;

	if (estado === "ativo") {
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
					viewBox="0 0 20 20"
					fill="none"
				>
					<Path
						strokeLinejoin="round"
						strokeLinecap="round"
						fill="#9AE6B4"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					></Path>
				</Svg>
			</View>
		);
	} else if (estado === "inativo") {
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
				>
					<Path
						stroke="#999999"
						strokeLinejoin="round"
						strokeLinecap="round"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					></Path>
				</Svg>
			</View>
		);
	}

	return icone;
}
