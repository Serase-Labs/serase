import * as React from "react";
import { View, Dimensions, Text } from "react-native";
import tailwind from "tailwind-rn";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd

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

// Componentes externos
import { PieChart } from "react-native-chart-kit";

export default function GraficoDespesaPadrao({ periodo }) {
	return (
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
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
				}}
				accessor="population"
				backgroundColor="transparent"
				paddingLeft={(Dimensions.get("window").width / 100) * 25}
				hasLegend={false}
			/>

			<View
				style={tailwind(
					"flex flex-row items-center justify-center my-2 flex-wrap"
				)}
			>
				{tipoDespesaData.map((value, index) => {
					console.log(value);
					return (
						<View
							style={tailwind("flex flex-row items-center p-2")}
							key={index}
						>
							<View
								style={[
									tailwind(
										"w-4 h-4 bg-green-400 mr-2 rounded-sm"
									),
									{ backgroundColor: value.color },
								]}
							></View>
							<Text style={tailwind("text-gray-600")}>
								{value.population}% - {value.name}
							</Text>
						</View>
					);
				})}
			</View>
		</View>
	);
}
