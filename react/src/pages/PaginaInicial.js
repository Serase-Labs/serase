import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

const estilos = {
	tela: tailwind("pt-32 items-center h-full bg-white"),
	titulo: tailwind("mt-6 mb-16 text-4xl font-bold text-blue-800"),

	botaoPrimarioGrande: tailwind("bg-green-400 py-2 rounded w-64"),
	botaoSecundarioGrande: tailwind("bg-blue-800 py-2 rounded w-64 mb-4"),
	textoBotao: tailwind("text-white font-medium text-lg text-center"),
};

export default function Login({ navigation }) {
	return (
		<View
			style={[
				{ backgroundColor: "#2AF598" },
				tailwind("flex bg-green-300 flex-col content-end h-full"),
			]}
		>
			<View style={tailwind("flex-1 flex items-center")}>
				<Text
					style={[
						tailwind(
							"text-white text-2xl text-center mx-12 mt-10 font-light"
						),
					]}
				>
					Gerencie suas despesas, metas e dívidas.
				</Text>
				<Image
					source={require("../assets/images/MockupTelaInicial.png")}
				></Image>
			</View>
			<View style={tailwind("bg-white items-center py-6")}>
				<Text style={tailwind("text-2xl text-blue-900 font-bold")}>
					Serase
				</Text>
				<Text
					style={tailwind(
						"font-hairline text-blue-900 text-xl mx-12 text-center my-4"
					)}
				>
					Sua vida financeira, na palma da sua mão.
				</Text>

				<TouchableOpacity
					style={estilos.botaoSecundarioGrande}
					onPress={() => navigation.navigate("Login")}
				>
					<Text style={estilos.textoBotao}>Fazer Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={estilos.botaoPrimarioGrande}
					onPress={() => navigation.navigate("Cadastro")}
				>
					<Text style={estilos.textoBotao}>Cadastrar</Text>
				</TouchableOpacity>
			</View>
		</View>

		/* <View style={estilos.tela}>
			<Image source={require("../assets/primarylogo144x144.png")} />
			<Text style={estilos.titulo}>Serase</Text>

			<TouchableOpacity style={estilos.botaoSecundarioMedio} onPress={() => navigation.navigate("Login")}>
				<Text style={estilos.textoBotao}>Fazer Login</Text>
			</TouchableOpacity>
			<TouchableOpacity style={estilos.botaoPrimarioMedio} onPress={() => navigation.navigate("Cadastro")}>
				<Text style={estilos.textoBotao}>Cadastrar</Text>
			</TouchableOpacity>
		</View> */
	);
}
