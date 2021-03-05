import * as React from "react";
import { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import tailwind from "tailwind-rn";
import { ContributionGraph } from "react-native-chart-kit";



//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd

const commitsData = {	
	date: [],
	count: []
};


// Componentes Internos

// Componentes Externos


export default function GraficoDespesaFrequencia({grafico}) {
	
	if(!grafico) console.log("O props 'grafico' deve ser definido para o componente 'GraficoDespesaFrequencia'!");

	commitsData.date = grafico.map(({data_lancamento,quantidade})=> [data_lancamento,Math.abs(quantidade)]);
	
	return (
		<View style={tailwind("flex items-center pt-6")}>
			<ContributionGraph
				values={commitsData}
				endDate={new Date("2021-02-28")}
				numDays={30}
				gutterSize={5}
				squareSize={20}
				horizontal={false}
				showMonthLabels={false}
				onDayPress={(value, item) => {
					console.log(value);
				}}
				width={(Dimensions.get("window").width / 100) * 70}
				height={120}
				chartConfig={{
					backgroundGradientFrom: "#ffffff",
					backgroundGradientTo: "#ffffff",
					decimalPlaces: 2,
					color: (opacity = 1) => `rgba(44, 127, 184, ${opacity})`,
					style: {},
				}}
			/>
			{/*<View
				style={tailwind(
					"bg-gray-100 mx-5 rounded flex flex-col items-center py-4 my-4 w-full"
				)}
			>
				<Text style={tailwind("text-base text-gray-900")}>
					Data: {date}
				</Text>
				<Text style={tailwind("text-base text-gray-900")}>
					{count} Movimentações
				</Text>
				</View>*/}
		</View>
	);
}
