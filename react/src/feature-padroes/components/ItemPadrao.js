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
import { useLinkProps } from "@react-navigation/native";

export default function ItemPadrao(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [isPressed, setPressed] = useState(false);

	const paga = () => {
		async function fetchData() {
			 
			let url = GLOBAL.BASE_URL + "/pagamento/"+filtro;
			if(filtro==''){
				url = GLOBAL.BASE_URL + "/cobrancas/";
			}
			
			
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});
				let json = await res.json();
				setPadrao(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}
	
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
				<TouchableOpacity style={tailwind("w-24 h-10")} ><Text style={tailwind("text-green-300 text-center text-lg font-bold")}>Pagar</Text></TouchableOpacity>
				:<TouchableOpacity style={tailwind("w-40 h-10")}><Text style={tailwind("text-blue-700 text-center text-base font-bold")} onPress={()=>setModalVisible(true)}>Ver Movimetações</Text></TouchableOpacity>}
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
					valor={props.valor}/>
			</Modal>

		</View>

	);
}
