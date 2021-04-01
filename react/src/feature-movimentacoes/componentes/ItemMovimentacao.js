import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Modal,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import tailwind from "tailwind-rn";

import IconeDespesa from "../../comum/assets/IconeDespesa";
import IconeReceita from "../../comum/assets/IconeReceita";
import ItemMovimentacaoDetalhado from "./ItemMovimentacaoDetalhado";

export default function ItemMovimentacao(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [isPressed, setPressed] = useState(false);

	let data = props.dataLancamento.split("-");

	return (
		<TouchableOpacity
			style={tailwind(
				"flex flex-row mb-4 ml-5 mr-5 px-4 py-2 items-center justify-center rounded-md"
			)}
			onPress={() => props.clickable? setModalVisible(true) : null}
		>
			<View style={tailwind("w-6 h-6 flex")}>
				{props.valorPago > 0 ? (
					<IconeReceita uso="nao" />
				) : (
					<IconeDespesa uso="nao" />
				)}
			</View>
			<View style={tailwind("flex-col mx-6 flex-grow")}>
				<Text
					style={tailwind(
						"text-base flex-grow text-left font-bold mb-1"
					)}
				>
					{props.descricao}
				</Text>
				<Text style={tailwind("text-gray-500")}>
					{data[2]}/{data[1]}/{data[0]}
				</Text>
			</View>
			<View>
				<Text style={tailwind("text-base font-bold")}>
					{props.valorPago}
				</Text>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<ItemMovimentacaoDetalhado indice={props.indice}/>
			</Modal>
		</TouchableOpacity>
	);
}
ItemMovimentacao.defaultProps = { clickable: true };