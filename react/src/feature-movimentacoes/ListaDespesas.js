import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	FlatList,
} from "react-native";
import tailwind from "tailwind-rn";

import ItemMovimentacao from "./componentes/ItemMovimentacao";
import IndicadorRetorno from "../comum/components/IndicadorRetorno";
import IconePesquisa from "../comum/assets/IconePesquisa";
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";

export default function ListaDespesas({ navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [despesas, setDespesa] = useState([]);
	const { token } = useAuth();

	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/movimentacoes/?tipo=despesa";
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});
				let json = await res.json();
				setDespesa(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}, []);

	function renderDespesa(despesas) {
		return (
			<View>
				<FlatList
					data={despesas.conteudo}
					extraData={despesas.conteudo}
					renderItem={renderizarMovimentacoes}
					keyExtractor={(item) => item.id}
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
				<IndicadorRetorno telaAtual={"Despesas"} />

				{/* 				<View style={tailwind("px-5")}>
					<Text style={tailwind("text-lg font-bold")}>
						Movimentações
					</Text>
				</View>

				<View style={[tailwind("flex-row bg-white justify-center")]}>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>
							Essa semana
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>Sempre</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>
							Cadastrar
						</Text>
					</TouchableOpacity>
				</View> */}
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

				<View style={tailwind(" mb-12 ")}>
					<View style={tailwind(" mb-24 ")}>
						<View style={tailwind("flex-col mb-24 ")}>
							{isLoading ? (
								<Text>Loading...</Text>
							) : (
								renderDespesa(despesas)
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
	movimentacao: tailwind("flex-row mb-4"),
	movimentacaoImg: tailwind("w-6 h-6"),
	movimentacaoTexto: tailwind("text-base flex-grow text-left font-bold"),
	movimentacaoValor: tailwind("text-base"),
	movimentacaoData: tailwind("text-gray-500"),
	botaoDespesa: tailwind("bg-blue-700 rounded-lg w-24 h-24 m-2 mt-6 mb-6"),
	botaoDespesaTxt: tailwind(
		"text-white text-left px-2 mt-6 text-xs font-thin text-opacity-75"
	),
	botaoDespesaVlrTxt: tailwind("text-white text-left text-sm px-2 font-bold"),
	botaoDespesaVlrTotal: tailwind(
		"rounded-lg w-24 h-24 m-2 mt-6 mb-6 bg-blue-700"
	),
};

const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});
