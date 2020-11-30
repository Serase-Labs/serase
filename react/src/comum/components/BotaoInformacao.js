import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

export default function BotaoInformacao(props) {
	// Props

	// Titulo informação
	// Conteúdo informação
	// onPress = direcionamento para interface que exibe
	// de maneira mais detalhada a informação sendo exibida

	return (
		<TouchableOpacity
			style={tailwind(
				"bg-blue-800 h-32 w-40 px-5 py-6 mr-2 rounded-lg flex justify-between"
			)}
			onPress={props.onPress}
			key={props.titulo}
		>
			<Text
				style={tailwind("text-gray-100 text-lg text-gray-100 w-10/12")}
			>
				{props.titulo}
			</Text>
			<Text style={tailwind("text-white text-lg font-bold")}>
				{props.conteudo}
			</Text>
		</TouchableOpacity>
	);
}
