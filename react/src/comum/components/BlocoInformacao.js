import React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";

export default function BlocoInformacao(props) {
	// Props

	// Titulo informação
	// Conteúdo informação

	return (
		<View
			style={tailwind(
				"bg-gray-100 px-3 py-5 flex flex-col justify-between rounded-md"
			)}
		>
			<Text style={tailwind("text-blue-900 w-10/12")}>
				{props.titulo}
			</Text>
			<Text style={tailwind("font-bold text-lg text-blue-900")}>
				{props.conteudo}
			</Text>
		</View>
	);
}
