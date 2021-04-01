import * as React from "react";
import { useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";

import IconeVoltar from "../assets/IconeVoltar";

export default function IndicadorRetorno({ telaAtual, navigation }) {
	return (
		<View
			style={tailwind(
				"p-5 w-full flex flex-row justify-start items-center"
			)}
		>
			<TouchableOpacity
				style={tailwind("w-8 h-8 p-1 bg-gray-200 rounded mr-3")}
				onPress={()=>navigation.goBack()}
			>
				<View style={tailwind("h-6 w-6")}>
					<IconeVoltar />
				</View>
			</TouchableOpacity>

			<Text style={tailwind("text-lg")}>{telaAtual}</Text>
		</View>
	);
}
