import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import tailwind from "tailwind-rn";

import Botao from "../../comum/components/Botao";
import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth.js";

export default function ItemDividaPagamento(divida) {
	const {token} = useAuth();

	return (
		<>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			></View>

			<View
				style={tailwind(
					"absolute w-full h-full flex items-center justify-center"
				)}
			>
				<View style={tailwind("bg-white p-6 rounded-md w-5/6")}>
                    <Text style={tailwind("text-lg font-bold text-center mb-6")}>Registrar Pagamento</Text>
                    <Text style={tailwind("text-center mb-6")}>Qual o valor do pagamento efetuado para a divída “{divida.credor}”?</Text>
					
					<View style={tailwind("flex flex-row justify-between")}>
						<Botao
							ordem="secundario"
							tamanho="pequeno"
							label="Alterar"
							onPress={() => setModalAlteracaoVisible(true)}
						/>
					</View>
				</View>
			</View>
		</>
	);
}

function excluirMovimentacao(token, tipo, nome, indice) {
	const titulo = `Excluir ${tipo}`;
	const descricao = `Tem certeza que deseja excluir a ${tipo} "${nome}"`;

	Alert.alert(
		titulo,
		descricao,
		[
			{
				text: "CANCELAR",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "SIM",
				onPress: () => excluir(token, indice)
			},
		],
		{ cancelable: true }
	);
}
