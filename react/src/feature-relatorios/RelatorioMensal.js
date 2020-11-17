import * as React from "react";
import { useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from "react-native";
import { ContributionGraph, PieChart } from "react-native-chart-kit";
import tailwind from "tailwind-rn";

import IconeDespesa from "../comum/assets/IconeDespesa";
import IconeReceita from "../comum/assets/IconeReceita";
import IconeSeta from "../comum/assets/IconeSeta";
import TabGrafico from "./components/TabGrafico";

const DATA = [
	{ titulo: "Maior Despesa", valor: "Lazer" },
	{ titulo: "Maior Salto", valor: "Alimentação" },
	{ titulo: "Maior Economia", valor: "Saúde" },
];

const Item = ({ item, onPress }) => {
	return (
		<TouchableOpacity
			style={tailwind(
				"bg-blue-800 h-32 w-40 px-5 py-6 mr-2 rounded-lg flex justify-between"
			)}
			onPress={onPress}
			key={item.titulo}
		>
			<Text style={tailwind("text-white text-lg text-gray-100")}>
				{item.titulo}
			</Text>
			<Text style={tailwind("text-white text-lg font-bold")}>
				{item.valor}
			</Text>
		</TouchableOpacity>
	);
};

const commitsData = [
	{ date: "2020-10-02", count: 1 },
	{ date: "2020-10-03", count: 2 },
	{ date: "2020-10-04", count: 3 },
	{ date: "2020-10-05", count: 4 },
	{ date: "2020-10-06", count: 5 },
	{ date: "2020-10-30", count: 2 },
	{ date: "2020-10-31", count: 3 },
	{ date: "2020-10-01", count: 2 },
	{ date: "2020-10-02", count: 4 },
	{ date: "2020-10-05", count: 2 },
	{ date: "2020-10-30", count: 4 },
];

const tipoDespesaData = [
	{
		name: "Fixas",
		population: 40,
		color: "#2C7FB8",
	},
	{
		name: "Variáveis",
		population: 50,
		color: "#C7E9B4",
	},
	{
		name: "Outros",
		population: 10,
		color: "#FFFFCC",
	},
];

const categoriaData = [
	{
		name: "Alimentação",
		population: 40,
		color: "#FFFFCC",
	},
	{
		name: "Lazer",
		population: 32,
		color: "#C7E9B4",
	},
	{
		name: "Compras",
		population: 12,
		color: "#7FCDBB",
	},
	{
		name: "Moradia",
		population: 9,
		color: "#41B6C4",
	},
	{
		name: "Transporte",
		population: 5,
		color: "#2C7FB8",
	},
	{
		name: "Outros",
		population: 2,
		color: "#253494",
	},
];

export default function RelatorioSemanal() {
	const renderItem = ({ item }) => {
		return <Item item={item} onPress={() => console.log(item.titulo)} />;
	};

	const [toggleGraficoCategoria, setToggleGraficoCategoria] = useState(false);

	return (
		<View style={tailwind("bg-white")}>
			{/* Blocos de informações estáticos */}
			<View style={tailwind("flex flex-row justify-between mx-5 mb-5")}>
				<View
					style={tailwind(
						"bg-gray-100 px-4 py-5 flex flex-col justify-between rounded-md"
					)}
				>
					<Text style={tailwind("text-gray-800")}>
						Gasto {"\n"}Total
					</Text>
					<Text style={tailwind("font-bold text-lg text-gray-800")}>
						R$1200
					</Text>
				</View>

				<View
					style={tailwind(
						"bg-gray-100 px-4 py-5 flex flex-col justify-between rounded-md"
					)}
				>
					<Text style={tailwind("text-gray-800")}>
						Gasto {"\n"}Total
					</Text>
					<Text style={tailwind("font-bold text-lg text-gray-800")}>
						R$1200
					</Text>
				</View>

				<View
					style={tailwind(
						"bg-gray-100 px-4 py-5 flex flex-col justify-between rounded-md"
					)}
				>
					<Text style={tailwind("text-gray-800")}>
						Gasto {"\n"}Total
					</Text>
					<Text style={tailwind("font-bold text-lg text-gray-800")}>
						R$1200
					</Text>
				</View>
			</View>

			{/* Blocos de informações clicáveis */}

			<View style={tailwind("border-b border-t border-gray-100 py-4")}>
				<View style={tailwind("mx-6 mb-4")}>
					<Text style={tailwind("text-lg font-bold text-gray-800")}>
						Análises
					</Text>
					<Text style={tailwind("text-base text-gray-800")}>
						Em relação a última semana.
					</Text>
				</View>

				<FlatList
					style={tailwind("ml-4")}
					data={DATA}
					renderItem={renderItem}
					horizontal={true}
					keyExtractor={(item) => item.titulo}
				/>
			</View>

			{/* Gráfico de despesa semanal */}
			<View
				style={tailwind("border-b border-t border-gray-100 py-4 px-6")}
			>
				<Text style={tailwind("mb-5 text-lg font-bold text-gray-800")}>
					Gráficos
				</Text>

				<TabGrafico
					conteudo="Despesas por categoria"
					descricao="Suas áreas de maior gasto este mês."
				>
					<View style={tailwind("flex items-center pt-6")}>
						<PieChart
							data={categoriaData}
							width={(Dimensions.get("window").width / 100) * 100}
							height={220}
							chartConfig={{
								backgroundColor: "#1cc910",
								backgroundGradientFrom: "#eff3ff",
								backgroundGradientTo: "#efefef",
								decimalPlaces: 2,
								color: (opacity = 1) =>
									`rgba(0, 0, 0, ${opacity})`,
							}}
							accessor="population"
							backgroundColor="transparent"
							paddingLeft={
								(Dimensions.get("window").width / 100) * 25
							}
							hasLegend={false}
						/>
					</View>
				</TabGrafico>

				<TabGrafico
					conteudo="Despesas por padrão"
					descricao="Seus gastos em despesas fixas e variáveis."
				>
					<View style={tailwind("flex items-center pt-6")}>
						<PieChart
							data={tipoDespesaData}
							width={(Dimensions.get("window").width / 100) * 100}
							height={220}
							chartConfig={{
								backgroundColor: "#1cc910",
								backgroundGradientFrom: "#eff3ff",
								backgroundGradientTo: "#efefef",
								decimalPlaces: 2,
								color: (opacity = 1) =>
									`rgba(0, 0, 0, ${opacity})`,
							}}
							accessor="population"
							backgroundColor="transparent"
							paddingLeft={
								(Dimensions.get("window").width / 100) * 25
							}
							hasLegend={false}
						/>

						<View
							style={tailwind(
								"flex flex-row items-center justify-center my-2"
							)}
						>
							<View
								style={tailwind(
									"flex flex-row items-center px-2"
								)}
							>
								<View
									style={tailwind(
										"w-4 h-4 bg-green-400 mr-2"
									)}
								></View>
								<Text style={tailwind("text-gray-600")}>
									Fixas
								</Text>
							</View>
							<View
								style={tailwind(
									"flex flex-row items-center px-2"
								)}
							>
								<View
									style={tailwind(
										"w-4 h-4 bg-yellow-200 mr-2"
									)}
								></View>
								<Text style={tailwind("text-gray-600")}>
									Variáveis
								</Text>
							</View>
							<View
								style={tailwind(
									"flex flex-row items-center px-2"
								)}
							>
								<View
									style={tailwind("w-4 h-4 bg-blue-700 mr-2")}
								></View>
								<Text style={tailwind("text-gray-600")}>
									Outras
								</Text>
							</View>
						</View>
					</View>
				</TabGrafico>
				<TabGrafico
					conteudo="Frequência de despesas"
					descricao="Distribuição dos seus gastos pelo mês."
				>
					<View style={tailwind("flex items-center pt-6")}>
						<ContributionGraph
							values={commitsData}
							endDate={new Date("2020-10-30")}
							numDays={30}
							gutterSize={5}
							squareSize={20}
							horizontal={false}
							showMonthLabels={false}
							onDayPress={(value, item) =>
								console.log(value, item)
							}
							width={(Dimensions.get("window").width / 100) * 70}
							height={120}
							chartConfig={{
								backgroundGradientFrom: "#ffffff",
								backgroundGradientTo: "#ffffff",
								decimalPlaces: 2,
								color: (opacity = 1) =>
									`rgba(44, 127, 184, ${opacity})`,
								style: {},
							}}
						/>
					</View>
				</TabGrafico>
			</View>

			{/* Seção de redirecionamento1*/}
			<View
				style={tailwind(
					"mt-4 mb-12 mx-5 py-4 bg-gray-100 flex items-center rounded-md"
				)}
			>
				<Text
					style={tailwind(
						"my-4 text-base text-gray-500 w-64 text-center"
					)}
				>
					Veja todas as suas despesas da semana em detalhes.
				</Text>

				<View
					style={tailwind("flex flex-row w-56 justify-between mb-3")}
				>
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
				</View>
			</View>
		</View>
	);
}
