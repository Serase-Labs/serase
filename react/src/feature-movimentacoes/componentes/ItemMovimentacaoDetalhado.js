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
import ItemMovimentacaoAlterar from "./ItemMovimentacaoAlterar";

export default function ItemMovimentacaoDetalhado({
	handleClose,
	show,
	children,
}) {
	const [tipo, setTipo] = useState("receita");
	const [modalAlteracaoVisible, setModalAlteracaoVisible] = useState(false);

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
				<View style={tailwind("bg-white p-12 rounded-md")}>
					<View style={tailwind("mb-12")}>
						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Valor
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								R$100,00
							</Text>
						</View>

						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Data
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								19/10/2020
							</Text>
						</View>

						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Categoria
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								Aposta
							</Text>
						</View>

						<View style={tailwind()}>
							<Text
								style={tailwind("text-base text-gray-800 mb-2")}
							>
								Valor
							</Text>
							<Text
								style={tailwind(
									"text-lg font-bold text-right w-56 self-end"
								)}
							>
								Lorem ipsum dolor sit amet, consectur adipiscing
								elit. Erat pallentesque mauris bibendum auctor
								tincidunt dui sed non.
							</Text>
						</View>
					</View>

					<View style={tailwind("flex flex-row justify-between")}>
						<Botao
							ordem="secundario"
							tamanho="pequeno"
							label="Alterar"
							onPress={() => setModalAlteracaoVisible(true)}
						/>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalAlteracaoVisible}
							onRequestClose={() =>
								setModalAlteracaoVisible(false)
							}
						>
							<ItemMovimentacaoAlterar />
						</Modal>
						<Botao
							ordem="erro"
							tamanho="pequeno"
							label="Excluir"
							onPress={() => excluirMovimentacao(tipo, "Abc")}
						/>
					</View>
				</View>
			</View>
		</>
	);
}

function excluirMovimentacao(tipo, nome) {
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
				onPress: () =>
					console.log("Requerir cancelamento de requisição"),
			},
		],
		{ cancelable: true }
	);
}
