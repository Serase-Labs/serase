import * as React from "react";
import {
	StatusBar,
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";

import IconeMenu from "../assets/icons/IconeMenu";
import IconeDespesa from "../assets/icons/IconeDespesa";
import IconeReceita from "../assets/icons/IconeReceita";
import IconeRelatorio from "../assets/icons/IconeRelatorio";
import IconeInformacao from "../assets/icons/IconeInformacao";

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

export default function VisualizacaoGeral() {
	const balanca_valores = [
		["R$500", "NA BALANÇA ATUAL"],
		["R$2.000", "GUARDADO"],
		["52%", "DE DÍVIDA PAGA"],
	];

	const movimentacoes = [
		[true, "Salário", "1234,50"],
		[true, "Salário", "1234,50"],
		[false, "Mercado", "500,00"],
		[false, "Ukulele", "200,00"],
		[true, "Mega Sena", "1.000.000"],
	];

	return (
		<View style={[tailwind("flex-1 bg-white"), estiloExcecao.container]}>
			<View
				style={tailwind(
					"p-5 w-full flex flex-row justify-between items-center"
				)}
			>
				<Text style={tailwind("text-lg")}>
					Olá,{" "}
					<Text style={tailwind("text-lg font-bold")}>
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
					{ elevation: 3 },
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
						{ elevation: 1 },
					]}
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
				<Text style={tailwind("text-lg font-bold")}>
					Movimentações Recentes
				</Text>
			</View>
		</View>
	);
}
