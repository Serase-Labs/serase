import React from "react";
import { Text, View, Image } from "react-native";

import tailwind from "tailwind-rn";

export default function IndicadorNavegacao({ tela }) {
	return (
		<View
			accessibilityRole="header"
			style={[
				tailwind("mb-6 w-full flex flex-row items-center pt-5 pl-5"),
			]}
		>
			<Image
				style={tailwind("mr-3 w-8 h-8")}
				source={require("../assets/monologo512x512.png")}
			/>
			<Text style={tailwind("text-base")}>{tela}</Text>
		</View>
	);
}
