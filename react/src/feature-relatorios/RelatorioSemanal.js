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
import { StackedBarChart } from "react-native-chart-kit";
import tailwind from "tailwind-rn";

import IconeDespesa from "../comum/assets/IconeDespesa";
import IconeReceita from "../comum/assets/IconeReceita";

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

const chartData = {
	labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
	legend: ["L1", "L2"],
	data: [
		[60, 60],
		[30, 30],
		[60, 60],
		[30, 30],
		[10, 20],
		[30, 30],
		[10, 20],
	],
	barColors: ["#65F6C1", "#F56565"],
};

export default function RelatorioSemanal() {
	const renderItem = ({ item }) => {
		return <Item item={item} onPress={() => console.log(item.titulo)} />;
	};

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
			<View style={tailwind("border-b border-t border-gray-100 py-4")}>
				<Text
					style={tailwind(
						"mx-6 mb-4 text-lg font-bold text-gray-800"
					)}
				>
					Movimentações
				</Text>

				<View style={tailwind("flex items-center")}>
					<StackedBarChart
						data={chartData}
						width={(Dimensions.get("window").width / 100) * 90}
						height={220}
						chartConfig={{
							backgroundGradientFrom: "#ffffff",
							backgroundGradientTo: "#ffffff",
							decimalPlaces: 1, // optional, defaults to 2dp
							color: (opacity = 1) =>
								`rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) =>
								`rgba(0, 0, 0, ${opacity})`,
							propsForDots: {
								r: "6",
								strokeWidth: "2",
								stroke: "#ffa726",
							},
							propsForBackgroundLines: {
								r: "3",
								strokeWidth: "1",
								stroke: "#E2E8F0",
							},

							propsForVerticalLabels: {
								textAnchor: "middle",
							},
							propsForHorizontalLabels: {
								textAnchor: "end",
							},
						}}
					/>
				</View>
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
