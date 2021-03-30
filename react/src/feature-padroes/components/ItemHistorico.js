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
	FlatList,
	KeyboardAvoidingView,
} from "react-native";
import tailwind from "tailwind-rn";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";

import IconeDespesaFixa from "../../comum/assets/IconeDepesaFixa";
import { Input } from "../../comum/components/Input";
import Botao from "../../comum/components/Botao";
import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth.js";
import ItemPadrao from "./ItemPagamento";
import ItemPagamento from "./ItemPagamento";

function cancelar(){

}

export default function ItemHistorico(props) {
	const {token} = useAuth();
	

	const[padrao,setPadrao] = useState();

	// Hooks para o Date Picker
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [temErro, setErro] = useState(false);
	const [resultado, setResultado] = useState(null);

	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/cobrancas/?cod_padrao="+props.cod_padrao;
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
	}, []);

	const header = () => {
		return(
			<View>
			<View
			style={tailwind(
				"flex flex-row mb-8 ml-5 mr-5 px-4 py-2 items-center justify-center rounded-md"
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
					{props.nome}
				</Text>
			</View>
			<View>
				<Text style={tailwind("text-base font-bold")}>
					R${props.valor}
				</Text>
			</View>
			
		</View>
		<View style={tailwind(
			"flex flex-row mb-8 ml-5 mr-5 px-4 py-2 items-center justify-center rounded-md")}>
			<Text style={tailwind("text-gray-600 text-base")} >As Movimentações registradas para esta Despesa Fixa.</Text>
		</View>
			
		</View>
		);
	}

	function renderPadrao(padrao) {
		return (
			<View style={tailwind("mb-8 mt-4"
				
			)}>
				<FlatList
					data={padrao.conteudo}
					extraData={padrao.conteudo}
					renderItem={renderizarPagamentos}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={header}
			></FlatList>
				<View style={tailwind("flex flex-row justify-between mt-2 text-right")}>
					<Botao
						
						ordem="erro"
						tamanho="pequeno"
						label="Excluir"
									//onPress={() => excluirMovimentacao(token, tipo, descricao, props.indice)}
					/>
				</View>
			</View>
		);
	}
	const renderizarPagamentos = ({ item }) => {
		return (
			
			
			<ItemPagamento
				indice={item.id}
				situacao={item.situacao}

				descricao={item.descricao}

        		valor = {item.valor_esperado}
        		categoria ={item.categoria}
				data_geracao={item.data_geracao}
			/> 
			
		);
	};



	return (
		<>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			></View>

			<View
				style={tailwind(
					"absolute w-full h-full flex items-center justify-end"
				)}
			>
				<View style={tailwind("bg-white w-full rounded-md py-12")}>
					<View style={tailwind("mb-6")}>
					{isLoading ? (
						<Text>Loading...</Text>
					) : (
						renderPadrao(padrao)
					)}
					</View>
					
				</View>
			</View>
		</>
	);
}
function renderErro(resultado) {
	return (
		<View >
			<Text >{resultado}</Text>
		</View>
	);
}

function renderSucesso(resultado) {
	return (
		<View >
			<Text >{resultado}</Text>
		</View>
	);
}
