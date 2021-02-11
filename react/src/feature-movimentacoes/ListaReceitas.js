import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
} from "react-native";
import tailwind from "tailwind-rn";

import ItemMovimentacao from "./componentes/ItemMovimentacao";
import IndicadorRetorno from "../comum/components/IndicadorRetorno";
import IconePesquisa from "../comum/assets/IconePesquisa";
import {BASE_URL} from "../../Global";

export default function VisualizacaoGeral({ navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [receitas, setReceita] = useState([]);

	useEffect(() => {
		async function fetchData() {
			let url = BASE_URL+"/movimentacoes/?tipo=receita";
			try {
				let res = await fetch(url);
				let json = await res.json();
				setReceita(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}, []);

	function renderReceita(receitas) {
		return (
			<View>
				<FlatList
					data={receitas.conteudo}
					extraData={receitas.conteudo}
					renderItem={renderizarMovimentacoes}
					keyExtractor={(item) => item.id }
					
				></FlatList>
			</View>
		);
	}

	const renderizarMovimentacoes = ({ item }) => {
		return (
			<ItemMovimentacao
				indice={item.id}
				descricao={item.descricao}
				valorPago={item.valor_pago}
				dataLancamento={item.data_lancamento}
			/>
		);
	};

	return (
		<View style={[estilos.tela, estiloExcecao.container]}>
			<View style={estilos.telaInterior}>
				<IndicadorRetorno telaAtual={"Receitas"} />

				<View
					style={[tailwind("flex-row bg-white justify-center")]}
				></View>
				<View style={tailwind("justify-between flex-row p-3")}>
					<TextInput
						style={tailwind("flex-row mx-2 flex-grow")}
						placeholder={"Pesquise por uma entrada de receita"}
						placeholderTextColor={"#A0AEC0"}
					/>
					<View style={[tailwind("flex-1")]}>
						<IconePesquisa />
					</View>
				</View>

				<View style={tailwind(" mb-2 ")}>
				<View style={tailwind(" mb-12 ")}>
				<View style={tailwind("flex-col mb-24 ")}>
					{isLoading ? (
						<Text>Loading...</Text>
					) : (
						renderReceita(receitas)
					)}
				</View>
				</View>
				</View>
			</View>
		</View>
	);
}

const headerHeight = StatusBar.currentHeight;

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),
	itemBalanca: tailwind("flex-1"),
	itemBalancaValor: tailwind("text-white text-lg font-bold"),
	itemBalancaDescricao: tailwind("text-white text-xs"),
	botoesMain: tailwind(
		"bg-gray-300 h-24 w-24 rounded-lg justify-center items-center"
	),
	botaoTerciarioGrande: tailwind("bg-transparent rounded my-4"),
	textoBotaoTerciario: tailwind(
		"text-blue-700 font-bold text-base text-center py-4 px-8"
	),
	botoesMainText: tailwind("text-blue-800 font-bold"),
	botoesMainImg: tailwind("w-6 h-6"),
	movimentacao: tailwind("flex-row mb-4 justify-between"),
	movimentacaoImg: tailwind("w-6 h-6"),
	movimentacaoTexto: tailwind("text-base flex-grow text-left font-bold"),
	movimentacaoValor: tailwind("text-base"),
	movimentacaoData: tailwind("text-gray-500"),
};

const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});
