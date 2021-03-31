import React from "react";
import tailwind from "tailwind-rn";
import { View, Text, StyleSheet, TextInput } from "react-native";

// Imports internos
import Botao from "../comum/components/Botao.js";
import {ModalInformativa, TextoPrincipal, TextoInformativo} from "../comum/components/ModalInformativa";

export default function Confirmacao({navigation}) {
	return (
		<View
			style={tailwind(
				"flex-1 flex-col items-center bg-white justify-center"
			)}
		>
			<ModalInformativa>
				<Text style={TextoPrincipal()}>Porque é importante configurar o seu saldo atual?</Text>
				<Text style={TextoInformativo()}>É por meio do seu saldo atual que o Serase fornecerá métricas para a análise e acompanhamento do seu saldo, as métricas vão te auxiliar no melhor caminho para alcançar o seu objetivo financeiro!</Text>
			</ModalInformativa>
            <Text
					style={[
						tailwind("text-xl font-bold text-center mb-2"),
						estilos.texto,
					]}
				>
					Configure seu saldo atual
				</Text>
                <Text
					style={[
						tailwind("text-lg text-center w-64 mb-10"),
						estilos.texto,
					]}
				>
					Adicione seu saldo atual para começar o gerencimento financeiro da maneira certa.
				</Text>

                <TextInput
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
				onChangeText={(text) => setCategoriaD(text)}
			    ></TextInput>
				
				<Botao
					ordem="primario"
					tamanho="medio"
					onPress={() => console.log("OnboardingMovimentacao")}
					label="Confirmar Saldo"
				></Botao>
                <Botao
					ordem="terciario"
					tamanho="grande"
					onPress={() =>
					navigation.navigate("Homepage")
					}
					label="Pular"
				></Botao>
			
		</View>
	);
}

const estilos = StyleSheet.create({
	inputPrincipal: tailwind(
		"border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"
	),
	texto: {
		color: "#0E305B",
	},
});
