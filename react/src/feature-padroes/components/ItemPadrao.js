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

import IconeReceita from "../../comum/assets/IconeReceita";
import ItemHistorico from "./ItemHistorico";
import ItemPagamentoPadrao from "./ItemPagamentoPadrao";
import { useLinkProps } from "@react-navigation/native";

export default function ItemPadrao(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [isPressed, setPressed] = useState(false);
	const [modalPagamentoVisible, setModalPagamentoVisible] = useState(false);


	
	
	function capitalize (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
		}
	
	return (
		<View>
		<View
			style={tailwind(
				"flex flex-row mb-4 ml-5 mr-5 px-4 py-2 items-center justify-center rounded-md"
			)}
		>
			<View style={tailwind("w-6 h-6 flex")}>
				<IconeDespesaFixa/>
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
				Situação: {capitalize(props.situacao)}
				</Text>
			</View>
			<View>
				<Text style={tailwind("text-base font-bold")}>
					R${props.valor}
				</Text>
				<Text style={tailwind("text-gray-500 mt-2")}>
					{props.categoria}
				</Text>
			</View>
			
		</View>
		
		<View style={tailwind("flex flex-row justify-between justify-center")}>
				{props.situacao=='pendente'?
				<TouchableOpacity style={tailwind("w-24 h-10")} ><Text style={tailwind("text-green-300 text-center text-lg font-bold")} onPress={()=>setModalPagamentoVisible(true)}>Pagar</Text></TouchableOpacity>
				:<TouchableOpacity style={tailwind("w-40 h-10")}><Text style={tailwind("text-blue-700 text-center text-base font-bold")} onPress={()=>setModalVisible(true)}>Ver Movimentações</Text></TouchableOpacity>}
		</View>
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() =>
			setModalVisible(false)
				}
			>
					<ItemHistorico cod_padrao={props.cod_padrao}
					nome={props.descricao}
					valor={props.valor}
					indice={props.indice}
					/>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalPagamentoVisible}
				onRequestClose={() => setModalPagamentoVisible(false)}
			>
				<ItemPagamentoPadrao indice={props.indice} valor={props.valor} descricao={props.descricao} setModal={setModalPagamentoVisible}/>
			</Modal>

		</View>

	);
}
