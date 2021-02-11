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
import IconeAdicionar from "../comum/assets/IconeAdicionar";
import ListaVazia from "../comum/components/ListaVazia.js";

import ItemMovimentacao from "../feature-movimentacoes/componentes/ItemMovimentacao";
import GLOBAL from "../Global";
import { useAuth } from "./auth";

export default function VisualizacaoGeral({ navigation }) {
	const { user, token } = useAuth();

	const [saldo, setSaldo] = useState();
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
			let url = GLOBAL.BASE_URL+"/movimentacoes/?limite=6";
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setMovimentacoes(json);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();

		async function fetchSaldo() {
			let url = GLOBAL.BASE_URL+"/saldo/";
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setSaldo(json.conteudo.total);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchSaldo();
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
			<View style={tailwind("bg-gray-100 p-5")}>
				<View
					style={tailwind(
						"w-full flex flex-row justify-between items-center"
					)}
				>
					<Text style={tailwind("text-lg")}>
						Olá,{" "}
						<Text style={[tailwind("text-xl font-bold")]}>
							{user.nome}
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
				<View style={tailwind("py-4")}>
					<Text style={tailwind("text-gray-800 py-2")}>
						Saldo Atual
					</Text>
					<Text
						style={tailwind(
							"text-gray-800 text-xl font-bold text-3xl"
						)}
					>
						R$ {saldo}
					</Text>
				</View>
			</View>

			<View style={[tailwind("flex-row m-5 justify-between")]}>
				<TouchableOpacity
					style={[
						tailwind(
							"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
						),
						{ elevation: 1 },
					]}
					onPress={() => navigation.navigate("ListaReceitas")}
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
					onPress={() => navigation.navigate("ListaDespesas")}
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

			<View style={tailwind("py-4")}>
				<Text
					style={[tailwind("px-5 text-lg font-bold text-gray-800")]}
				>
					Movimentações Recentes
				</Text>

				{isLoading ? (
					<View style={tailwind("opacity-25")}>
						<Text>Loading...</Text>
					</View>
				) : (
					<View style={tailwind("py-4")}>
						{renderMovimentacoes(movimentacoes)}
					</View>
				)}
			</View>

			<TouchableOpacity
				style={[
					tailwind("w-16 h-16 bg-green-300 absolute rounded-full"),
					{ top: "85%", right: "5%" },
				]}
				onPress={() => navigation.navigate("ListaDespesas")}
			></TouchableOpacity>
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
