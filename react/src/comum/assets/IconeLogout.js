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
        <Svg xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5"
					fill="none"
					height="100%"
					width="100%"
					viewBox="0 0 24 24"
					stroke="currentColor"
					color="#555555">
          <Path stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </Svg>
			</View>
		);
	}
}
