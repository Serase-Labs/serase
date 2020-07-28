import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

const estilos = {
	tela: tailwind("pt-32 items-center h-full bg-white"),
	titulo: tailwind("mt-6 mb-16 text-4xl font-bold text-blue-800"),

	botaoPrimarioMedio: tailwind("bg-green-400 py-2 rounded w-40"),
	botaoSecundarioMedio: tailwind("bg-blue-800 py-2 rounded w-40 mb-6"),
	textoBotao: tailwind("text-white font-medium text-lg text-center"),
};

export default function Login() {
	return (
		<View style={estilos.tela}>
			<Image source={require("../assets/primarylogo144x144.png")} />
			<Text style={estilos.titulo}>Serase</Text>

			<TouchableOpacity style={estilos.botaoSecundarioMedio}>
				<Text style={estilos.textoBotao}>Fazer Login</Text>
			</TouchableOpacity>
			<TouchableOpacity style={estilos.botaoPrimarioMedio}>
				<Text style={estilos.textoBotao}>Cadastrar</Text>
			</TouchableOpacity>
		</View>
	);
}
