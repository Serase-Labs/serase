import * as React from "react";
import {
	StatusBar,
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";

import IconeMenu from "../assets/icons/IconeMenu";
import FormularioVazio from "../assets/ilustracoes/FormularioVazio";

export default function ListaVazia({ mensagem }) {
	return (
		<View style={tailwind("p-8")}>
			<View
				style={tailwind("h-40 flex items-center justify-center mb-4")}
			>
				<FormularioVazio />
			</View>
			<Text style={tailwind("text-gray-700 text-center text-lg")}>
				{mensagem}
			</Text>
		</View>
	);
}
