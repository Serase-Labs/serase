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
						d="M10.797 1.33a1.127 1.127 0 00-1.594 0L1.316 9.217A1.127 1.127 0 002.91 10.81l.33-.33v7.42a1.127 1.127 0 001.127 1.127H6.62a1.127 1.127 0 001.127-1.126v-2.254a1.127 1.127 0 011.126-1.127h2.254a1.127 1.127 0 011.127 1.127v2.254a1.127 1.127 0 001.126 1.126h2.254a1.127 1.127 0 001.126-1.126v-7.42l.33.33a1.127 1.127 0 001.594-1.594L10.797 1.33z"
					/>
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
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					></Path>
				</Svg>
			</View>
		);
	}

	return icone;
}
