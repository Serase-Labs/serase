import React from "react";
import tailwind from "tailwind-rn";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Imports internos
import Botao from "../comum/components/Botao.js";
import IlustracaoCadastro from "../comum/assets/IlustracaoCadastro.js";

export default function Confirmacao({navigation}) {
	return (
		<View
			style={tailwind(
				"flex-1 flex-col items-center bg-white justify-end"
			)}
		>
			<View
				style={[
					tailwind("w-full flex-col items-center bg-gray-300"),
					estilos.fundoDinamico,
				]}
			>
				<View style={estilos.ilustracao}>
					<IlustracaoCadastro />
				</View>

				<Text
					style={[
						tailwind("text-xl font-bold text-center mb-2"),
						estilos.texto,
					]}
				>
					Cadastro Concluído
				</Text>
				<Text
					style={[
						tailwind("text-xl text-center w-64 mb-10"),
						estilos.texto,
					]}
				>
					Comece a gerenciar sua vida financeira agora.
				</Text>
				<Botao
					ordem="primario"
					tamanho="medio"
					onPress={() => navigation.navigate("OnboardingMovimentacao")}
					label="Começar"
				></Botao>
			</View>
		</View>
	);
}

const windowHeight = Dimensions.get("window").height;

const estilos = StyleSheet.create({
	fundoDinamico: {
		height: (windowHeight / 100) * 60,
		borderTopRightRadius: 360,
		borderTopLeftRadius: 360,
	},
	texto: {
		color: "#0E305B",
	},
	ilustracao: {
		bottom: (windowHeight / 100) * 10,
	},
});
