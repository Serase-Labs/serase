import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";
import tailwind from "tailwind-rn";
// Imports internos
import IconeMenu from "../comum/assets/IconeMenu";
import IconeDespesa from "../comum/assets/IconeDespesa";
import IconeReceita from "../comum/assets/IconeReceita";
import IconeRelatorio from "../comum/assets/IconeRelatorio";
import ListaVazia from "../comum/components/ListaVazia.js";

import ItemMovimentacao from "../feature-movimentacoes/componentes/ItemMovimentacao";

import { useAuth } from "./auth";

export default function VisualizacaoGeral({ navigation }) {
	const { user, token } = useAuth();

	const [movimentacoes, setMovimentacoes] = useState();
	const [isLoading, setLoading] = useState(true);
	const [despesas, setDespesa] = useState([]);

	const balanca_valores = [
		["R$500", "NA BALANÇA ATUAL"],
		["R$2.000", "GUARDADO"],
		["52%", "DE DÍVIDA PAGA"],
	];

	useEffect(() => {
		async function fetchData() {
			let url = "http://192.168.18.13:8000/movimentacoes/?limite=10";

			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setMovimentacoes(json);
				setLoading(false);
				console.log(json);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	function renderMovimentacoes(movimentacoes) {
		return (
			<View>
				<FlatList
					data={movimentacoes.conteudo}
					extraData={movimentacoes.conteudo}
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
		<ScrollView
			bounces={true}
			showsVerticalScrollIndicator={false}
			style={[tailwind("flex-1 bg-white"), estiloExcecao.container]}
		>
			<View
				style={tailwind(
					"p-5 w-full flex flex-row justify-between items-center"
				)}
			>
				<Text style={tailwind("text-lg")}>
					Olá,{" "}
					<Text style={[tailwind("text-xl font-bold")]}>
						Peter Parker
					</Text>
				</Text>

				<TouchableOpacity
					style={tailwind("w-10 h-10 p-1 bg-gray-200 rounded")}
				>
					<View style={tailwind("h-8 w-8")}>
						<IconeMenu />
					</View>
				</TouchableOpacity>
			</View>

			<View
				style={[
					tailwind(
						"mx-5 p-5 bg-blue-700 flex flex-row justify-between rounded-md"
					),
				]}
			>
				<View>
					<Text style={tailwind("text-white")}>Saldo{"\n"}Atual</Text>
					<Text style={tailwind("text-white text-xl font-bold")}>
						R$500
					</Text>
				</View>

				<View>
					<Text style={tailwind("text-white")}>
						Ganho{"\n"}Recente
					</Text>
					<Text style={tailwind("text-white text-xl font-bold")}>
						R$500
					</Text>
				</View>
				<View>
					<Text style={tailwind("text-white")}>
						Despesa{"\n"}Recente
					</Text>
					<Text style={tailwind("text-white text-xl font-bold")}>
						R$500
					</Text>
				</View>
			</View>

			<View style={tailwind("flex-row m-5 justify-between")}>
				<TouchableOpacity
					style={[
						tailwind(
							"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
						),
						{ elevation: 2 },
					]}
					onPress={() => navigation.navigate("Receitas")}
				>
					<View style={tailwind("w-8 h-8 mb-1")}>
						<IconeReceita uso="sistema" />
					</View>
					<Text
						style={[
							tailwind("text-base text-blue-900"),
							{ fontWeight: "bold" },
						]}
					>
						Receitas
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						tailwind(
							"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
						),
						{ elevation: 1 },
					]}
					onPress={() => navigation.navigate("Despesas")}
				>
					<View style={tailwind("w-8 h-8 mb-1")}>
						<IconeDespesa uso="sistema" />
					</View>
					<Text
						style={[
							tailwind("text-base text-blue-900"),
							{ fontWeight: "bold" },
						]}
					>
						Despesas
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						tailwind(
							"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
						),
						{ elevation: 1 },
					]}
					onPress={() => navigation.navigate("Relatorios")}
				>
					<View style={tailwind("w-8 h-8 mb-1")}>
						<IconeRelatorio />
					</View>
					<Text
						style={[
							tailwind("text-base text-blue-900"),
							{ fontWeight: "bold" },
						]}
					>
						Receitas
					</Text>
				</TouchableOpacity>
			</View>

			<View style={tailwind("px-5")}>
				<Text style={[tailwind("text-lg font-bold text-gray-800")]}>
					Movimentações Recentes
				</Text>

				<View style={tailwind("opacity-25")}>
					{isLoading ? (
						<Text>Loading...</Text>
					) : (
						console.log(movimentacoes)
					)}
				</View>
			</View>
		</ScrollView>
	);
}

const headerHeight = StatusBar.currentHeight;

const estilos = {
	itemBalanca: tailwind("flex-1"),
	itemBalancaValor: tailwind("text-white text-lg font-bold"),
	itemBalancaDescricao: tailwind("text-white text-xs"),
	botoesMain: tailwind(
		"bg-gray-300 h-24 w-24 rounded-lg justify-center items-center"
	),
	botoesMainText: tailwind("text-blue-800 font-bold"),
	botoesMainImg: tailwind("w-6 h-6"),
	movimentacao: tailwind("flex-row mb-4"),
	movimentacaoImg: tailwind("w-6 h-6"),
	movimentacaoTexto: tailwind("text-base flex-grow text-left mx-6 font-bold"),
	movimentacaoValor: tailwind("text-base"),
};

const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});
