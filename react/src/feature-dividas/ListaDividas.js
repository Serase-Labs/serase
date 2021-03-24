import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	FlatList,
} from "react-native";
import tailwind from "tailwind-rn";


import IndicadorRetorno from "../comum/components/IndicadorRetorno";
import Botao from "../comum/components/Botao";

import ItemDivida from "./componentes/ItemDivida";
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";


export default function ListaDividas({ navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [dividas, setDividas] = useState([]);
	const[data, setData] = useState(9000);
	const { token } = useAuth();

	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/dividas/";
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});

				let json = await res.json();

				setDividas(json.conteudo);
				console.log(json);
				setLoading(false);

				return json;
			} catch (error) {
                console.error(error);
            }
		}
		fetchData();
	}, []);

	function renderDivida(divida) {
		return (
			<View>
				<FlatList
					data={divida}
					extraData={divida}
					renderItem={renderizarDivida}
					keyExtractor={(item) => item.id}
				></FlatList>
			</View>
		);
	}

	const renderizarDivida = ({ item }) => {
		return (
			<ItemDivida
				indice={item.id}
				{...item}
			/>
		);
	};

	return (
		<View style={[estilos.tela, estiloExcecao.container]}>
			<View style={estilos.telaInterior}>
				<IndicadorRetorno telaAtual={"Dívida"} />

                <Botao ordem="secundario" tamanho="grande" label="+ Registrar Dívida" espacamento={true}/>

				<View style={tailwind("mb-12")}>
					<View style={tailwind("mb-24")}>
						<View style={tailwind("flex-col mb-24")}>
							{isLoading ? (
								<Text>Loading...</Text>
							) : (
								renderDivida(dividas)
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
	telaInterior: tailwind("flex-1 items-center"),
	itemBalanca: tailwind("flex-1"),
	itemBalancaValor: tailwind("text-white text-lg font-bold"),
	itemBalancaDescricao: tailwind("text-white text-xs"),
	botoesMain: tailwind(
		"bg-gray-300 h-24 w-24 rounded-lg justify-center items-center"
	),
	botaoTerciarioGrande: tailwind("bg-transparent rounded my-2"),
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
