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
import { LinearGradient } from "expo-linear-gradient";

// Imports internos
import IconeMenu from "../comum/assets/IconeMenu";
import IconeLogout from "../comum/assets/IconeLogout";
import IconeNotificacao from "../comum/assets/IconeNotificacao";
import IconeDespesa from "../comum/assets/IconeDespesa";
import IconeReceita from "../comum/assets/IconeReceita";
import IconeRelatorio from "../comum/assets/IconeRelatorio";
import IconeDivida from "../comum/assets/IconeDivida";
import IconeAdicionar from "../comum/assets/IconeAdicionar";
import ListaVazia from "../comum/components/ListaVazia.js";

import ItemMovimentacao from "../feature-movimentacoes/componentes/ItemMovimentacao";
import GLOBAL from "../Global";
import { useAuth } from "./auth";

export default function VisualizacaoGeral({ navigation }) {
	const { user, token, signOut } = useAuth();

	const [saldo, setSaldo] = useState();
	const [movimentacoes, setMovimentacoes] = useState();
	const [isLoadingSaldo, setLoadingSaldo] = useState(true);
	const [isLoadingData, setLoadingData] = useState(true);
	const [despesas, setDespesa] = useState([]);

	const balanca_valores = [
		["R$500", "NA BALANÇA ATUAL"],
		["R$2.000", "GUARDADO"],
		["52%", "DE DÍVIDA PAGA"],
	];

	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/movimentacoes/?limite=6";
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setMovimentacoes(json);
				setLoadingData(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();

		async function fetchSaldo() {
			let url = GLOBAL.BASE_URL + "/saldo/";
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setSaldo(json.conteudo.total);
				setLoadingSaldo(false);
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
			<View style={tailwind("px-5 py-4")}>
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

					<View style={tailwind("flex flex-row justify-end items-end")}>

						<TouchableOpacity
							style={tailwind("w-10 h-10 p-1 bg-gray-200 rounded flex items-center justify-center mr-6")}
							onPress={() => {navigation.navigate("Login"); signOut()}}
						>
							<View style={tailwind("h-6 w-6")}>
								<IconeLogout />
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={tailwind("w-10 h-10 p-1 bg-gray-200 rounded flex items-center justify-center")}
							onPress={() => {navigation.navigate("Central");}}
						>
							<View style={tailwind("w-8 h-8 rounded-full bg-gray-100 flex justify-center items-center")}>
								<View style={tailwind("w-6 h-6")}>
									<IconeNotificacao/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			
				<LinearGradient
        // Button Linear Gradient
        colors={['#48639C', '#2AF598']}
				style={tailwind("mx-5 my-4 p-6 rounded-md")}
        >
        <View style={tailwind("")}>
					<Text style={tailwind("text-white py-2")}>
						Saldo Atual
					</Text>
					<Text
						style={tailwind(
							"text-white text-xl font-bold text-3xl"
						)}
					>
						R$ {saldo}
					</Text>
				</View>
      	</LinearGradient>

			<ScrollView horizontal style={[tailwind("ml-5 my-5")]}>

				<TouchableOpacity
					style={[tailwind("w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mr-4")]}
					onPress={() => navigation.navigate("AdicionaMovimentacao")}
				>
					<View style={tailwind("w-12 h-12 mb-1 rounded-full bg-gray-100 flex justify-center items-center")}>
						<View style={tailwind("w-8 h-8")}>
							<IconeAdicionar/>
						</View>
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={[tailwind("w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mr-4")]}
					onPress={() => navigation.navigate("ListaReceitas")}
				>
					<View style={tailwind("w-12 h-12 mb-1 rounded-full bg-gray-100 flex justify-center items-center")}>
						<View style={tailwind("w-8 h-8")}>
							<IconeReceita uso="sistema" />
						</View>
					</View>
					<Text
						style={[tailwind("text-base text-blue-900 font-bold")]}
					>
						Receitas
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						tailwind(
							"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mr-4"
						),
						{ elevation: 1 },
					]}
					onPress={() => navigation.navigate("ListaDespesas")}
				>
					<View style={tailwind("w-12 h-12 mb-1 rounded-full bg-gray-100 flex justify-center items-center")}>
						<View style={tailwind("w-8 h-8")}>
							<IconeDespesa uso="sistema" />
						</View>
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
							"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mr-4"
						),
						{ elevation: 1 },
					]}
					onPress={() => navigation.navigate("Relatorios")}
				>
					<View style={tailwind("w-12 h-12 mb-1 rounded-full bg-gray-100 flex justify-center items-center")}>
						<View style={tailwind("w-8 h-8")}>
							<IconeRelatorio />
						</View>
					</View>
					<Text
						style={[
							tailwind("text-base text-blue-900"),
							{ fontWeight: "bold" },
						]}
					>
						Relatórios
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						tailwind(
							"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mr-4"
						),
						{ elevation: 1 },
					]}
					onPress={() => navigation.navigate("Relatorios")}
				>
					<View style={tailwind("w-12 h-12 mb-1 rounded-full bg-gray-100 flex justify-center items-center")}>
						<View style={tailwind("w-8 h-8")}>
							<IconeDivida />
						</View>
					</View>
					<Text
						style={[
							tailwind("text-base text-blue-900"),
							{ fontWeight: "bold" },
						]}
					>
						Dívida
					</Text>
				</TouchableOpacity>
			</ScrollView>

			<View style={tailwind("py-4")}>
				<Text
					style={[tailwind("px-5 text-lg font-bold text-gray-800")]}
				>
					Movimentações Recentes
				</Text>

				{isLoadingData ? (
					<View style={tailwind("opacity-25")}>
						<Text>Loading...</Text>
					</View>
				) : (
					<View style={tailwind("py-4")}>
						{renderMovimentacoes(movimentacoes)}
					</View>
				)}
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
