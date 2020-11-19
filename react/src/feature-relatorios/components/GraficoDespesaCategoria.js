import * as React from "react";
import { View, Dimensions } from "react-native";
import tailwind from "tailwind-rn";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd
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

////

// Componentes externos
import { PieChart } from "react-native-chart-kit";

export default function GraficoCategoriaMensal() {
	return (
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
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
				}}
				accessor="population"
				backgroundColor="transparent"
				paddingLeft={(Dimensions.get("window").width / 100) * 25}
				hasLegend={false}
			/>
		</View>
	);
}
