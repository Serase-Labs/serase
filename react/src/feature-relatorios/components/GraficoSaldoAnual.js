import * as React from "react";
import { useState } from "react";
import {
	Stylesheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";

// Componentes Internos

// Componentes Externos
import { LineChart } from "react-native-chart-kit";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd
const data = {
	labels: [
		"Jan",
		"Fev",
		"Mar",
		"Abr",
		"Mai",
		"Jun",
		"Jul",
		"Ago",
		"Set",
		"Out",
		"Nov",
		"Dez",
	],
	datasets: [
		{
			data: [925, 400, 50, 750, 450, 700, 925, 400, 50, 750, 450, 700],
			color: (opacity = 1) => `rgba(32, 233, 24, ${opacity})`, // optional
			strokeWidth: 2, // optional
		},
	],
};

export default function GraficoDespesaSemanal({grafico}) {
	// Atualizam a legenda interativa do gráfico
	const [index, setIndex] = useState(null);
	const [value, setValue] = useState(null);

	let grafico_data = [];
	for(let i=0; i<12; i++){
		grafico_data.push(0.0);	
	}

	for(let {mes, saldo} of grafico)
		grafico_data[Number(mes)-1] = Number(saldo);
	
	data.datasets[0].data = grafico_data;
	
	return (
		<View>
			<ScrollView horizontal={true}>
				<LineChart
					data={data}
					width={Dimensions.get("window").width * 2}
					height={220}
					withShadow={false}
					withVerticalLines={false}
					fromZero={true}
					onDataPointClick={(value, dataset, getColor) => {
						setIndex(value.index), setValue(value.value);
					}}
					chartConfig={{
						backgroundGradientFrom: "#ffffff",
						backgroundGradientTo: "#ffffff",
						decimalPlaces: 0, // optional, defaults to 2dp
						color: (opacity = 1) =>
							`rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) =>
							`rgba(51, 51, 51, ${opacity})`,
						propsForDots: {
							r: "3",
							strokeWidth: "2",
							fill: "#ffffff",
							stroke: "#20E918",
						},
						propsForBackgroundLines: {
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
			</ScrollView>

			<View
				style={tailwind(
					"bg-gray-100 mx-5 rounded flex flex-col items-center py-4 my-4"
				)}
			>
				<Text style={tailwind("text-base text-gray-900")}>
					Mês: {index}
				</Text>
				<Text style={tailwind("text-base text-gray-900")}>
					Saldo: {value}
				</Text>
			</View>
		</View>
	);
}
