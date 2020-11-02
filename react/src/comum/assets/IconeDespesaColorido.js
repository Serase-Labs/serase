import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeDespesaColorido extends React.Component {
	constructor(props) {
		super(props);
		this.color = props.uso == "sistema" ? "#2A4365" : "#E53E3E";
	}

	render() {
		return (
			<View
				style={[
					StyleSheet.absoluteFill,
					{ alignItems: "center", justifyContent: "center" },
				]}
			>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.99994 15.9999C6.7529 16.0008 5.55056 15.5356 4.62882 14.6956C3.70709 13.8557 3.1325 12.7016 3.01779 11.4599C2.90308 10.2181 3.25654 8.97831 4.00881 7.98373C4.76107 6.98914 5.85785 6.31156 7.08394 6.08394C7.2993 4.93761 7.90849 3.90258 8.80617 3.15784C9.70384 2.41311 10.8336 2.00549 11.9999 2.00549C13.1663 2.00549 14.296 2.41311 15.1937 3.15784C16.0914 3.90258 16.7006 4.93761 16.9159 6.08394C18.1379 6.31619 19.2295 6.99541 19.9778 7.98906C20.726 8.98271 21.0772 10.2195 20.9628 11.4581C20.8484 12.6967 20.2766 13.8482 19.359 14.688C18.4414 15.5277 17.2438 15.9955 15.9999 15.9999M8.99994 18.9999L11.9999 21.9999M11.9999 21.9999L14.9999 18.9999M11.9999 21.9999V9.99994" stroke="#E53E3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
            
			</View>
		);
	}
}
