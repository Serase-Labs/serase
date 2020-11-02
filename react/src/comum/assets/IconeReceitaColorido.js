import Svg, { Path } from "react-native-svg";

import React from "react";
import { View, StyleSheet } from "react-native";

export default class IconeReceitaColorido extends React.Component {
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
<Path d="M7.99994 16.9999C6.7529 17.0008 5.55056 16.5356 4.62882 15.6956C3.70709 14.8557 3.1325 13.7016 3.01779 12.4599C2.90308 11.2181 3.25654 9.97831 4.00881 8.98373C4.76107 7.98914 5.85785 7.31156 7.08394 7.08394C7.2993 5.93761 7.90849 4.90258 8.80617 4.15784C9.70384 3.41311 10.8336 3.00549 11.9999 3.00549C13.1663 3.00549 14.296 3.41311 15.1937 4.15784C16.0914 4.90258 16.7006 5.93761 16.9159 7.08394C18.1379 7.31619 19.2295 7.99541 19.9778 8.98906C20.726 9.98271 21.0772 11.2195 20.9628 12.4581C20.8484 13.6967 20.2766 14.8482 19.359 15.688C18.4414 16.5277 17.2438 16.9955 15.9999 16.9999M8.99994 11.9999L11.9999 8.99994M11.9999 8.99994L14.9999 11.9999M11.9999 8.99994V20.9999" stroke="#2AF598" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

            
			</View>
		);
	}
}
