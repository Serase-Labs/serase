import * as React from "react";
import { useState } from "react";
import {
	Stylesheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import tailwind from "tailwind-rn";

// Componentes Internos

// Componentes Externos
import { StackedBarChart } from "react-native-chart-kit";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd
const chartData = {
	labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
	legend: [],
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

export default function GraficoDespesaSemanal() {
	return (
		<View>
			<View style={tailwind("")}>
				<StackedBarChart
					data={chartData}
					width={(Dimensions.get("window").width / 100) * 90}
					height={220}
					hideLegend={true}
					showLegend={false}
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
							textAnchor: "end",
						},
						propsForHorizontalLabels: {
							textAnchor: "middle",
						},
						barPercentage: 1,
					}}
				/>
			</View>

			<View
				style={tailwind(
					"flex flex-row items-center justify-center my-2"
				)}
			>
				<View style={tailwind("flex flex-row items-center px-2")}>
					<View style={tailwind("w-4 h-4 bg-green-400 mr-2")}></View>
					<Text style={tailwind("text-gray-600")}>Receitas</Text>
				</View>
				<View style={tailwind("flex flex-row items-center px-2")}>
					<View style={tailwind("w-4 h-4 bg-red-400 mr-2")}></View>
					<Text style={tailwind("text-gray-600")}>Despesas</Text>
				</View>
			</View>
		</View>
	);
}
