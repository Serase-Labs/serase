import * as React from "react";
import { View, Dimensions } from "react-native";
import tailwind from "tailwind-rn";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd

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

// Componentes externos
import { ContributionGraph } from "react-native-chart-kit";

export default function GraficoDespesaFrequencia() {
	return (
		<View style={tailwind("flex items-center pt-6")}>
			<ContributionGraph
				values={commitsData}
				endDate={new Date("2020-10-30")}
				numDays={30}
				gutterSize={5}
				squareSize={20}
				horizontal={false}
				showMonthLabels={false}
				onDayPress={(value, item) => console.log(value, item)}
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
		</View>
	);
}
