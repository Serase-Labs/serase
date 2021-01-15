import React from "react";
import { Text, View, Image } from "react-native";
import tailwind from "tailwind-rn";
import Botao from "../components/Botao.js";

const estilos = {
	tela: tailwind("pt-32 items-center h-full bg-white"),
	titulo: tailwind("mt-6 mb-16 text-4xl font-bold text-blue-800"),
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

				<Botao
					ordem="secundario"
					tamanho="grande"
					onPress={() => navigation.navigate("Login")}
					label="Fazer Login"
					espacamento={true}
				></Botao>

				<Botao
					ordem="primario"
					tamanho="grande"
					onPress={() => navigation.navigate("Cadastro")}
					label="Cadastrar"
				></Botao>
			</View>
		</View>
	);
}
