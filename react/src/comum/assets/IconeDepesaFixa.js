
import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default function IconeDespesaFixa() {
	let icone;

		icone = (
			<View
				style={[
					StyleSheet.absoluteFill,
					{ alignItems: "center", justifyContent: "center" },
				]}
			>
            <Svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 9.5L8 16.5L1 9.5M15 1.5L8 8.5L1 1.5" stroke="#F56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
			</View>
		);
	 

	return icone;
}
