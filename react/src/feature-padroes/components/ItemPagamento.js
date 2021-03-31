import * as React from "react";
import { useState, useEffect } from "react";
import {
	Modal,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import tailwind from "tailwind-rn";
import IconeDespesaFixa from "../../comum/assets/IconeDepesaFixa";
import Botao from "../../comum/components/Botao";

import IconeDespesa from "../../comum/assets/IconeDespesa";
import IconeReceita from "../../comum/assets/IconeReceita";
import ItemHistorico from "./ItemHistorico";
import { useLinkProps } from "@react-navigation/native";

export default function ItemPagamento(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [isPressed, setPressed] = useState(false);

	function data(str) {
		str=str+"";
		if(str.match('-')){
		var data = str.split('-');
		var data = data[2]+'/'+data[1]+'/'+data[0];
		return data;
		} else{ 
			return '';
		}
	}
	
	return (
		<View>
		<View
			style={tailwind(
				"flex flex-row mb-4 ml-5 mr-5 px-4 py-2 items-center justify-center rounded-md"
			)}
		>
			<View style={tailwind("w-6 h-6 flex")}>
				<IconeDespesa/>
			</View>
			<View style={tailwind("flex-col mx-6 flex-grow")}>
				<Text
					style={tailwind(
						"text-base flex-grow text-left font-bold mb-1"
					)}
				>
					{props.descricao}
				</Text>
				<Text style={tailwind("text-gray-500 mt-2")}>
				{data(props.data_geracao)}
				</Text>
			</View>
			<View>
				<Text style={tailwind("text-base font-bold")}>
					R${props.valor}
				</Text>
			</View>
			
		</View>

		</View>

	);
}
